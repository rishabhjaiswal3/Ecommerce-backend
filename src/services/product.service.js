const Category = require('../models/category.model');

async function createProduct(reqData) {

    let topLevel = await Category.findOne({name:reqData.topLevelCategory});

    if(!topLevel) {
        topLevel: new Category({
            name:reqData.topLevelCategory,
            level:1
        })
    }

    const secondLevel = await Category.findOne({
        name:reqData.secondLevelCategory,
        parentCategory:topLevel?._id 
    })

    if(!secondLevel) {

        secondLevel = new Category({
            name:reqData.secondLevelCategory,
            parentCategory:topLevel?._id,
            level:2
        })  

    }
    let thirdLevel = await Category.fineOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id
    })
    if(!thirdLevel){
        thirdLevel = new Cateogry({
            level:3,
            name:reqData.thirdLevelCategory,
            parentCategory:secondLevel._id
        })
    }

    const product = new Product({
        title: reqData.title,
        description: reqData.description,
        color: reqData.color,
        discountedPrice: reqData.discountedPrice,
        discountedPercent: reqData.discountedPercent,
        imageurl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.size,
        quantity: reqData.quantity,
        cateogory: thirdLevel?._id
    })
    return await product.save();
}

async function deleteProduct(productId) {

    const product = await findProductByid(parentId);

    await Product.findByIdAndDelete(productId);

    return "Product Deleted Successfully ";

}

async function updateProduct(productId, reqData) {
    return  await Product.findByIdAndUpdate(productId,reqData);
}


async function findProductByid(id) {
    const product = await Product.findById(id).populate('category').exec();

    if(!product){
        throw new Error("Product tnot found with id ",+id);
    }
    return product;
}

async function getAllProducts(reqQuery) {

    let {category,color,sizes,minPrice,maxPrice,minDiscount,sort, stock, pageNumber,pageSize} = reqQuery;

    pageSize = pageSize || 10;

    let query = Product.find().populate("category");

    if(category) {
        const existCategory = await Category.findOne({name:category});
        if(existCategory){
            query = query.where("category").equals(existCategory._id);
        }
        else {
            return {content:[],currentPage:1,totalPages:0};
        }

    }

    // white, blck, orange
    if(color){
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));

        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"),"i"): null;

        query = query.where("color").regex(colorRegex);
    }

    if(sizes) {
        const sizesSet = new Set(sizes);
        query.query.where('sizes.name').in([...sizesSet]);
    }

    if(minPrice && maxPrice) {
        query = await query.where('discountedPrice').gte(minPrice).lte(maxPrice);
    }

    if(minDiscount) {
        query = query.where('discountPersent').gte(minDiscount);
    }

    if(stock) {
        if(stock == "in_stock") {
            query = query.where('quantity').gte(0);
        }
        else if(stock == 'out_of_stock') {
            query = query.where("quantity").lt(1);
        }
    }

    if(sort) {
        const sortDirection = sort == "price_hight" ? -1 : 1;
        query = query.sort({discountedPrice: sortDirection});
    }

    const totalProducts = await Product.countDocuments(query);

    const skip = (pageNumber - 1) * pageSize;

    query = query.skip().limit(pageSize);

    const products  = await query.exec();

    const totalPages = Math.ceil(totalProducts/pageSize);

    return {content:products, currentPage: pageNumber, totalPages};
}


async function createMultiProduct(products) {

    for(let product of Products) {

        await createProduct(product);
    }
}


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductByid,
    createMultiProduct
}