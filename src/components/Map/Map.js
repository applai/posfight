import React from 'react';
import p2 from "p2";
import WebGLRenderer from "./WebGLRenderer";

export default () => {

  const shouldersDistance = 0.5,
    upperArmLength = 0.4,
    lowerArmLength = 0.4,
    upperArmSize = 0.2,
    lowerArmSize = 0.2,
    neckLength = 0.1,
    headRadius = 0.25,
    upperBodyLength = 0.6,
    pelvisLength = 0.4,
    upperLegLength = 0.5,
    upperLegSize = 0.2,
    lowerLegSize = 0.2,
    lowerLegLength = 0.5;

  // Create demo application
  const app = new WebGLRenderer(function(){

    const OTHER =     Math.pow(2,4),
        BODYPARTS = Math.pow(2,2),
        GROUND =    Math.pow(2,3),
        bodyPartShapes = [];

    const headShape = new p2.Circle({ radius: headRadius }),
        upperArmShapeLeft = new p2.Box({ width: upperArmLength, height: upperArmSize }),
        upperArmShapeRight = new p2.Box({ width: upperArmLength, height: upperArmSize }),
        lowerArmShapeLeft = new p2.Box({ width: lowerArmLength, height: lowerArmSize }),
        lowerArmShapeRight = new p2.Box({ width: lowerArmLength, height: lowerArmSize }),
        upperBodyShape = new p2.Box({ width: shouldersDistance, height: upperBodyLength }),
        pelvisShape = new p2.Box({ width: shouldersDistance, height: pelvisLength }),
        upperLegShapeLeft = new p2.Box({ width: upperLegSize, height: upperLegLength }),
        upperLegShapeRight = new p2.Box({ width: upperLegSize, height: upperLegLength }),
        lowerLegShapeLeft = new p2.Box({ width: lowerLegSize, height: lowerLegLength }),
        lowerLegShapeRight = new p2.Box({ width: lowerLegSize, height: lowerLegLength });

    bodyPartShapes.push(
        headShape,
        upperArmShapeRight,
        upperArmShapeLeft,
        lowerArmShapeRight,
        lowerArmShapeLeft,
        upperBodyShape,
        pelvisShape,
        upperLegShapeRight,
        upperLegShapeLeft,
        lowerLegShapeRight,
        lowerLegShapeLeft
    );

    for(let i=0; i<bodyPartShapes.length; i++){
        const s = bodyPartShapes[i];
        s.collisionGroup = BODYPARTS;
        s.collisionMask = GROUND|OTHER;
    }

    const world = new p2.World({
        gravity : [0,-10]
    });

    this.setWorld(world);

    world.solver.iterations = 100;
    world.solver.tolerance = 0.002;

    // Lower legs
    const lowerLeftLeg = new p2.Body({
        mass: 1,
        position: [-shouldersDistance/2,lowerLegLength / 2],
    });
    const lowerRightLeg = new p2.Body({
        mass: 1,
        position: [shouldersDistance/2,lowerLegLength / 2],
    });
    lowerLeftLeg.addShape(lowerLegShapeLeft);
    lowerRightLeg.addShape(lowerLegShapeRight);
    world.addBody(lowerLeftLeg);
    world.addBody(lowerRightLeg);

    // Upper legs
    const upperLeftLeg = new p2.Body({
        mass: 1,
        position: [-shouldersDistance/2,lowerLeftLeg.position[1]+lowerLegLength/2+upperLegLength / 2],
    });
    const upperRightLeg = new p2.Body({
        mass: 1,
        position: [shouldersDistance/2,lowerRightLeg.position[1]+lowerLegLength/2+upperLegLength / 2],
    });
    upperLeftLeg.addShape(upperLegShapeLeft);
    upperRightLeg.addShape(upperLegShapeRight);
    world.addBody(upperLeftLeg);
    world.addBody(upperRightLeg);

    // Pelvis
    const pelvis = new p2.Body({
        mass: 1,
        position: [0, upperLeftLeg.position[1]+upperLegLength/2+pelvisLength/2],
    });
    pelvis.addShape(pelvisShape);
    world.addBody(pelvis);

    // Upper body
    const upperBody = new p2.Body({
        mass: 1,
        position: [0,pelvis.position[1]+pelvisLength/2+upperBodyLength/2],
    });
    upperBody.addShape(upperBodyShape);
    world.addBody(upperBody);

    // Head
    const head = new p2.Body({
        mass: 1,
        position: [0,upperBody.position[1]+upperBodyLength/2+headRadius+neckLength],
    });
    head.addShape(headShape);
    world.addBody(head);

    // Upper arms
    const upperLeftArm = new p2.Body({
        mass: 1,
        position: [-shouldersDistance/2-upperArmLength/2, upperBody.position[1]+upperBodyLength/2],
    });
    const upperRightArm = new p2.Body({
        mass: 1,
        position: [shouldersDistance/2+upperArmLength/2, upperBody.position[1]+upperBodyLength/2],
    });
    upperLeftArm.addShape(upperArmShapeLeft);
    upperRightArm.addShape(upperArmShapeRight);
    world.addBody(upperLeftArm);
    world.addBody(upperRightArm);

    // lower arms
    const lowerLeftArm = new p2.Body({
        mass: 1,
        position: [ upperLeftArm.position[0] - lowerArmLength/2 - upperArmLength/2,
                    upperLeftArm.position[1]],
    });
    const lowerRightArm = new p2.Body({
        mass: 1,
        position: [ upperRightArm.position[0] + lowerArmLength/2 + upperArmLength/2,
                    upperRightArm.position[1]],
    });
    lowerLeftArm.addShape(lowerArmShapeLeft);
    lowerRightArm.addShape(lowerArmShapeRight);
    world.addBody(lowerLeftArm);
    world.addBody(lowerRightArm);


    // Neck joint
    const neckJoint = new p2.RevoluteConstraint(head, upperBody, {
        localPivotA: [0,-headRadius-neckLength/2],
        localPivotB: [0,upperBodyLength/2],
    });
    neckJoint.setLimits(-Math.PI / 8, Math.PI / 8);
    world.addConstraint(neckJoint);

    // Knee joints
    const leftKneeJoint = new p2.RevoluteConstraint(lowerLeftLeg, upperLeftLeg, {
        localPivotA: [0, lowerLegLength/2],
        localPivotB: [0,-upperLegLength/2],
    });
    const rightKneeJoint= new p2.RevoluteConstraint(lowerRightLeg, upperRightLeg, {
        localPivotA: [0, lowerLegLength/2],
        localPivotB:[0,-upperLegLength/2],
    });
    leftKneeJoint.setLimits(-Math.PI / 8, Math.PI / 8);
    rightKneeJoint.setLimits(-Math.PI / 8, Math.PI / 8);
    world.addConstraint(leftKneeJoint);
    world.addConstraint(rightKneeJoint);

    // Hip joints
    const leftHipJoint = new p2.RevoluteConstraint(upperLeftLeg, pelvis, {
        localPivotA: [0, upperLegLength/2],
        localPivotB: [-shouldersDistance/2,-pelvisLength/2],
    });
    const rightHipJoint = new p2.RevoluteConstraint(upperRightLeg, pelvis, {
        localPivotA: [0, upperLegLength/2],
        localPivotB: [shouldersDistance/2,-pelvisLength/2],
    });
    leftHipJoint.setLimits(-Math.PI / 8, Math.PI / 8);
    rightHipJoint.setLimits(-Math.PI / 8, Math.PI / 8);
    world.addConstraint(leftHipJoint);
    world.addConstraint(rightHipJoint);

    // Spine
    const spineJoint = new p2.RevoluteConstraint(pelvis, upperBody, {
        localPivotA: [0,pelvisLength/2],
        localPivotB: [0,-upperBodyLength/2],
    });
    spineJoint.setLimits(-Math.PI / 8, Math.PI / 8);
    world.addConstraint(spineJoint);

    // Shoulders
    const leftShoulder = new p2.RevoluteConstraint(upperBody, upperLeftArm, {
        localPivotA:[-shouldersDistance/2, upperBodyLength/2],
        localPivotB:[upperArmLength/2,0],
    });
    const rightShoulder= new p2.RevoluteConstraint(upperBody, upperRightArm, {
        localPivotA:[shouldersDistance/2,  upperBodyLength/2],
        localPivotB:[-upperArmLength/2,0],
    });
    leftShoulder.setLimits(-Math.PI / 3, Math.PI / 3);
    rightShoulder.setLimits(-Math.PI / 3, Math.PI / 3);
    world.addConstraint(leftShoulder);
    world.addConstraint(rightShoulder);

    // Elbow joint
    const leftElbowJoint = new p2.RevoluteConstraint(lowerLeftArm, upperLeftArm, {
        localPivotA: [lowerArmLength/2, 0],
        localPivotB: [-upperArmLength/2,0],
    });
    const rightElbowJoint= new p2.RevoluteConstraint(lowerRightArm, upperRightArm, {
        localPivotA:[-lowerArmLength/2,0],
        localPivotB:[upperArmLength/2,0],
    });
    leftElbowJoint.setLimits(-Math.PI / 8, Math.PI / 8);
    rightElbowJoint.setLimits(-Math.PI / 8, Math.PI / 8);
    world.addConstraint(leftElbowJoint);
    world.addConstraint(rightElbowJoint);

    // Create ground
    const planeShape = new p2.Plane();
    const plane = new p2.Body({
        position:[0,-1],
    });
    plane.addShape(planeShape);
    planeShape.collisionGroup = GROUND;
    planeShape.collisionMask =  BODYPARTS|OTHER;
    world.addBody(plane);

    this.newShapeCollisionGroup = OTHER;
    this.newShapeCollisionMask =  BODYPARTS|OTHER|GROUND;
  });
  return (
    <div>
    </div>
  );
}