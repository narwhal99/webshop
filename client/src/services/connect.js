import Api from '@/services/Api'

export default {
    addproduct(product) {
        return Api().post('product', product, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    addproductGroup(group) {
        return Api().post('product-group', group)
    },
    getProductGroup(tag) {
        return Api().get('product-group/tag', {
            params: {
                tag
            }
        })
    },
    getProductGroup_index() {
        return Api().get('product-group/index')
    },
    getProductGroup_byindex(index) {
        return Api().get('product-group', {
            params: {
                index: index
            }
        })
    },
    getProduct(index) {
        return Api().get('product', {
            params: {
                index: index
            }
        })
    },
    geteveryproduct_group() {
        return Api().get('product-group/all')
    },
    deleteimg(img) {
        return Api().delete('image', {
            data: { img: img }
        })
    },
    uploadImg(img) {
        return Api().patch('image', img, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}