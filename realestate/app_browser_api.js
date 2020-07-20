const abApi = {
    baseURL : 'https://65s3cosuz9:wanfum2ih5@demo-5149438130.us-east-1.bonsaisearch.net:443',
    filter: function(category, page = 1) {
        console.log(`abApi.filter category[${category}] page[${page}]`);
        //return axios.get(`${this.baseURL}/${category}/${page}`);
        try {
            return new Promise((resolve, reject) => {
                $.get( `${abApi.baseURL}/sapps/_search`, 
                        //data = {query: {'match_all': {}}}, 
                        function( data ) {
                            console.log(data);
                            if (data === null || typeof data === 'undefined') return;
                            resolve(data.hits.hits);
                })
                .fail(function(err){
                    reject(err);
                });
            });
        }
        catch(ex) {
            console.error(ex);
        }
        return null;
    }
};