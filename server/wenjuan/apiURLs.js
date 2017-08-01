export const loginURL = 'https://www.wenjuan.com/openapi/v3/login/?'
export const projectList = 'https://www.wenjuan.com/openapi/v3/get_proj_list/?'

httpGetAsync = (url, options) =>
    new Promise((resolve, reject) => {
        HTTP.get(url, options, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
