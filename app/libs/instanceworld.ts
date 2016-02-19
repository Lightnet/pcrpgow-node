export module Globals
{
   export var m_Name : string = "Game Manage";
   export var m_Instance : any;
}

class instanceworld{
    //public static MyInstance:any;
    self:any = this;
    name:string;
    id:any;
    modulelist:any = [];
    //console.log("init manage");
    
    constructor() {
        if(Globals.m_Instance == null){
            Globals.m_Instance = this.self;
            this.id =  Math.random();
        }else if(Globals.m_Instance != this.self ){
            this.self = Globals.m_Instance;
        }
      //console.log("init manage plugin:"+this.id);
      //console.log(module);
      //console.log(Globals);
	  return this;
    }
    
    addModule(_module){
        //console.log("Added Module...");
        this.modulelist.push(_module);
    }
    
    getID(){
        return this.id;
    }
}

exports = (module).exports = new instanceworld();