export class Material{
    public constructor(
        public materialId : number = 0,
        public materialName : string = "",
        public filepath : string = "",
        public courseId : number = 0,
        public userId : number = 0,
        public description : string = ""
    ){}
}