/*
	Project Name: Node Web Sandbox API
	Link:https://bitbucket.org/Lightnet/nodewebsandboxapi
	Created By: Lightnet
	License: Creative Commons [Note there multiple Licenses]
  	Please read the readme.txt file for more information.
  
	Information: 
	
*/

//declare var module: any;

export module Globals
{
   export var m_Name : string = "Game Manage";
   export var m_Instance : any;
}

class Manage{
    //public static MyInstance:any;
    self:any = this;
    name:string;
    id:any;
    //console.log("init manage");
    constructor() {
        if(Globals.m_Instance == null){
            Globals.m_Instance = this;
            this.id =  Math.random();
        }else if(Globals.m_Instance != this){
            this.self = Globals.m_Instance;
        }
      console.log("init manage"+this.id);
      //console.log(module);
      //console.log(Globals);
    }
}

class Data{
    name:string;
    //console.log("init manage");
    constructor() {
      console.log("init manage");  
    }
    
}


(module).exports = Manage;
/*
class Manage{
    constructor(){
        console.log("Init Manage");
    }
}

export Manage;
*/