export const toggleEdit = (config: any, status?: boolean) => {
    Object.keys(config).forEach((key) => {
        if (status !== undefined) {
            config[key].attributes.readonly = status;
            if (config[key].attributes.disable !== undefined) {
                config[key].attributes.disable = status;
            } 
        } else {
            config[key].attributes.readonly = !config[key].attributes.readonly;
            if (config[key].attributes.disable !== undefined) {
                config[key].attributes.disable = !config[key].attributes.disable;
            } 
        }
    });
}