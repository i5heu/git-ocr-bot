import fs from "fs";

export interface Config {
    hostname: string,
    port: number,
    imgUrl: string
} 

/**
 * Will read and merge the configs
 * 
 * @example 
 * ```ts
 * const cm = new configManager();
 * constr gitUser = cm.config.gitUser;
 * ```
 *
 * @export
 * @class configManager
 */
export class configManager {
    public config: Config;

    constructor() {
        //merge the two configs with priority to configUser
        this.config = {...this.configDefault, ...this.configUser};
    }
    
    private get configDefault (){
        const configDefaultFs = fs.readFileSync("config/config.default.json");
        const configDefault = JSON.parse(configDefaultFs.toString());
        return configDefault;
    }
    
    private get configUser (){
        const configUserFs = fs.readFileSync("config/config.json");
        const configUser = JSON.parse(configUserFs.toString());        
        return configUser;
    }
}