import {variableCache} from "../models/variableCache"

class botVariableCache{
    private static instance: any;
    private cache: Map<string, any>;

    constructor(){
        this.cache = new Map<string, any>();
    }

    public static getInstance(): botVariableCache{
        if (!botVariableCache.instance){
            botVariableCache.instance = new botVariableCache();
        }

        return botVariableCache.instance;
    }

    public add(variableName: string, variableValue: any){
        this.cache.set(variableName, variableValue);
    }

    public get(variableName: string): any | Error | undefined{
        if (this.cache.has(variableName)){
            return this.cache.get(variableName);
        }

        return new Error(`Variable ${variableName} does not exist`);
    }

    public set(variableName: string, value: any){
        if (!this.cache.has(variableName)){
            throw new Error(`Variable ${variableName} does not exist`);
        }

        this.cache.set(variableName, value);
    }
}

export default botVariableCache.getInstance();