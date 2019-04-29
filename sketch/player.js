class Player {

    bxs = 0;
    bys = 0;
    bxe = 0;
    bye = 0;

    hx = 0;
    hy = 0;

    lbxs = 0;
    lbys = 0;
    lbxe = 0;
    lbye = 0;

    laxs = 0;
    lays = 0;
    laxe = 0;
    laye = 0;

    rbxs = 0;
    rbys = 0;
    rbxe = 0;
    rbye = 0;

    raxs = 0;
    rays = 0;
    raxe = 0;
    raye = 0;

    luxs = 0;
    luys = 0;
    luxe = 0;
    luye = 0;

    llxs = 0;
    llys = 0;
    llxe = 0;
    llye = 0;

    ruxs = 0;
    ruys = 0;
    ruxe = 0;
    ruye = 0;

    rlxs = 0;
    rlys = 0;
    rlxe = 0;
    rlye = 0;

    smoothness = 0.5;
    color = [[0, 0, 255], [0, 255, 0], [255, 0, 0], [0, 255, 255], [0, 0, 0], [255, 255, 255]]


    constructor() { }

    refresh(pos) {

        //head
        let newhx = pos['pose']['keypoints'][0]['position']['x']
        let newhy = pos['pose']['keypoints'][0]['position']['y']

        //body
        let newbxs = (pos['pose']['keypoints'][5]['position']['x'] + pos['pose']['keypoints'][6]['position']['x']) / 2;
        let newbys = (pos['pose']['keypoints'][5]['position']['y'] + pos['pose']['keypoints'][6]['position']['y']) / 2;
        let newbxe = (pos['pose']['keypoints'][11]['position']['x'] + pos['pose']['keypoints'][12]['position']['x']) / 2;
        let newbye = (pos['pose']['keypoints'][11]['position']['y'] + pos['pose']['keypoints'][12]['position']['y']) / 2;
        //left bicep
        let newlbxs = pos['pose']['keypoints'][5]['position']['x']
        let newlbys = pos['pose']['keypoints'][5]['position']['y']
        let newlbxe = pos['pose']['keypoints'][7]['position']['x']
        let newlbye = pos['pose']['keypoints'][7]['position']['y']

        //left forearm
        let newlaxs = pos['pose']['keypoints'][7]['position']['x']
        let newlays = pos['pose']['keypoints'][7]['position']['y']
        let newlaxe = pos['pose']['keypoints'][9]['position']['x']
        let newlaye = pos['pose']['keypoints'][9]['position']['y']

        //right bicep
        let newrbxs = pos['pose']['keypoints'][6]['position']['x']
        let newrbys = pos['pose']['keypoints'][6]['position']['y']
        let newrbxe = pos['pose']['keypoints'][8]['position']['x']
        let newrbye = pos['pose']['keypoints'][8]['position']['y']

        //right forearm
        let newraxs = pos['pose']['keypoints'][8]['position']['x']
        let newrays = pos['pose']['keypoints'][8]['position']['y']
        let newraxe = pos['pose']['keypoints'][10]['position']['x']
        let newraye = pos['pose']['keypoints'][10]['position']['y']

        //left upper leg
        let newluxs = pos['pose']['keypoints'][11]['position']['x']
        let newluys = pos['pose']['keypoints'][11]['position']['y']
        let newluxe = pos['pose']['keypoints'][13]['position']['x']
        let newluye = pos['pose']['keypoints'][13]['position']['y']

        //left lower leg
        let newllxs = pos['pose']['keypoints'][13]['position']['x']
        let newllys = pos['pose']['keypoints'][13]['position']['y']
        let newllxe = pos['pose']['keypoints'][15]['position']['x']
        let newllye = pos['pose']['keypoints'][15]['position']['y']

        //right upper leg
        let newruxs = pos['pose']['keypoints'][12]['position']['x']
        let newruys = pos['pose']['keypoints'][12]['position']['y']
        let newruxe = pos['pose']['keypoints'][14]['position']['x']
        let newruye = pos['pose']['keypoints'][14]['position']['y']

        //right lower leg
        let newrlxs = pos['pose']['keypoints'][14]['position']['x']
        let newrlys = pos['pose']['keypoints'][14]['position']['y']
        let newrlxe = pos['pose']['keypoints'][16]['position']['x']
        let newrlye = pos['pose']['keypoints'][16]['position']['y']

        this.bxs = lerp(this.bxs, newbxs, this.smoothness);
        this.bys = lerp(this.bys, newbys, this.smoothness);
        this.bxe = lerp(this.bxe, newbxe, this.smoothness);
        this.bye = lerp(this.bye, newbye, this.smoothness);

        this.hx = lerp(this.hx, newhx, this.smoothness);
        this.hy = lerp(this.hy, newhy, this.smoothness);

        this.lbxs = lerp(this.lbxs, newlbxs, this.smoothness);
        this.lbys = lerp(this.lbys, newlbys, this.smoothness);
        this.lbxe = lerp(this.lbxe, newlbxe, this.smoothness);
        this.lbye = lerp(this.lbye, newlbye, this.smoothness);

        this.laxs = lerp(this.laxs, newlaxs, this.smoothness);
        this.lays = lerp(this.lays, newlays, this.smoothness);
        this.laxe = lerp(this.laxe, newlaxe, this.smoothness);
        this.laye = lerp(this.laye, newlaye, this.smoothness);

        this.rbxs = lerp(this.rbxs, newrbxs, this.smoothness);
        this.rbys = lerp(this.rbys, newrbys, this.smoothness);
        this.rbxe = lerp(this.rbxe, newrbxe, this.smoothness);
        this.rbye = lerp(this.rbye, newrbye, this.smoothness);

        this.raxs = lerp(this.raxs, newraxs, this.smoothness);
        this.rays = lerp(this.rays, newrays, this.smoothness);
        this.raxe = lerp(this.raxe, newraxe, this.smoothness);
        this.raye = lerp(this.raye, newraye, this.smoothness);

        this.luxs = lerp(this.luxs, newluxs, this.smoothness);
        this.luys = lerp(this.luys, newluys, this.smoothness);
        this.luxe = lerp(this.luxe, newluxe, this.smoothness);
        this.luye = lerp(this.luye, newluye, this.smoothness);

        this.llxs = lerp(this.llxs, newllxs, this.smoothness);
        this.llys = lerp(this.llys, newllys, this.smoothness);
        this.llxe = lerp(this.llxe, newllxe, this.smoothness);
        this.llye = lerp(this.llye, newllye, this.smoothness);

        this.ruxs = lerp(this.ruxs, newruxs, this.smoothness);
        this.ruys = lerp(this.ruys, newruys, this.smoothness);
        this.ruxe = lerp(this.ruxe, newruxe, this.smoothness);
        this.ruye = lerp(this.ruye, newruye, this.smoothness);

        this.rlxs = lerp(this.rlxs, newrlxs, this.smoothness);
        this.rlys = lerp(this.rlys, newrlys, this.smoothness);
        this.rlxe = lerp(this.rlxe, newrlxe, this.smoothness);
        this.rlye = lerp(this.rlye, newrlye, this.smoothness);

    }

    draw(i) {

        stroke(this.color[i])
        fill(this.color[i])

        line(this.bxs, this.bys, this.bxe, this.bye)

        ellipse(this.hx, this.hy, 100, 100)

        //arms
        line(this.lbxs, this.lbys, this.lbxe, this.lbye)
        line(this.laxs, this.lays, this.laxe, this.laye)
        line(this.rbxs, this.rbys, this.rbxe, this.rbye)
        line(this.raxs, this.rays, this.raxe, this.raye)

        //legs
        line(this.luxs, this.luys, this.luxe, this.luye)
        line(this.llxs, this.llys, this.llxe, this.llye)
        line(this.ruxs, this.ruys, this.ruxe, this.ruye)
        line(this.rlxs, this.rlys, this.rlxe, this.rlye)
    }
}