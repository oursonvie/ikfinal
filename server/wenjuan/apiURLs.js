export const loginURL = 'https://www.wenjuan.com/openapi/v3/login/?'
export const projectListURL = 'https://www.wenjuan.com/openapi/v3/get_proj_list/?'
export const contentURL = 'https://www.wenjuan.com/s/'
export const surveyResultURL = 'https://www.wenjuan.com/openapi/v3/get_rspd_detail_list/?'

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
