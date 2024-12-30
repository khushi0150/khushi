class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // API search feature
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",  // Case insensitive search
            }
        } : {};

        console.log(keyword);  // This logs the search query, useful for debugging

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Removing some fields that we don't want to filter on
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);

        let queryStr = JSON.stringify(queryCopy);

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }


    pagination(resultpage){

        const currentpages=Number (this.queryStr.page )|| 1;

        const skip=resultpage*(currentpages-1);


        this.query=this.query.limit(resultpage).skip(skip)
        return this;


    }


}







module.exports = ApiFeatures;
