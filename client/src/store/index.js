import Vue from 'vue'
import Vuex from 'vuex'
import connectServices from '../services/connect'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: true,
    error: '',
    content: null,
    product: null,
    productGroupIndex: [],
  },
  getters: {
    getProduct: state => state.product,
    getContent: state => state.content,
    getProductGroupIndex: state => state.productGroupIndex,
    isloading: state => state.loading
  },
  mutations: {
    loading(state) {
      state.loading = false
    },
    auth_product(state, product) {
      state.product = product
    },
    auth_content(state, content) {
      state.content = content
    },
    auth_productGroupindex(state, index) {
      state.productGroupIndex = index
    }
  },
  actions: {
    async addProduct({ commit }, product) {
      try {
        const resp = await connectServices.addproduct(product)
        commit('empty')
        return resp
      } catch (err) {
        console.log(err)
      }
    },
    async addProductGroup({ commit }, group) {
      try {
        const resp = await connectServices.addproductGroup(group)
        commit('empty')
        return resp
      } catch (err) {
        console.log(err)
      }
    },
    async getGroupProductsByTag({ commit }, tags) {
      try {
        const resp = await connectServices.getProductGroup(tags)
        commit('auth_content', resp.data)
      } catch (err) {
        console.log(err)
      }
    },
    async getProductGroupIndex({ commit }) {
      try {
        const resp = await connectServices.getProductGroup_index()
        commit("auth_productGroupindex", resp.data)
      } catch (err) {
        console.log(err)
      }
    },
    async getGroupProductsByIndex({ commit }, index) {
      try {
        const resp = await connectServices.getProductGroup_byindex(index)
        commit('auth_product', resp.data)
      } catch (err) {
        console.log(err)
      }
    },
    async getProduct({ commit }, index) {
      try {
        const resp = await connectServices.getProduct(index)
        commit('auth_product', resp.data)
      } catch (err) {
        console.log(err)
      }
    },
    async geteveryproduct_group({ commit }) {
      try {
        const resp = await connectServices.geteveryproduct_group()
        commit('auth_content', resp.data)
      } catch (err) {
        console.log(err)
      }
    },
    async deleteimg({ commit }, img) {
      try {
        const resp = await connectServices.deleteimg(img)
        commit('auth_content', resp.data)
      } catch (err) {
        console.log(err)
      }
    },
    async uploadImg({ commit }, img) {
      try {
        const resp = await connectServices.uploadImg(img)
        commit('auth_content', resp.data)
      } catch (err) {
        console.log(err)
      }
    },
    async productgroup_patch({ commit }, group) {
      try {
        const resp = await connectServices.editProductGroup(group)
        commit('auth_content', resp.data)
        return resp.status
      } catch (err) {
        console.log(err)
      }
    },
    async deleteProductGroup({ commit }, group) {
      try {
        await connectServices.deleteProductGroup(group)
        commit('empty')
      } catch (err) {
        console.log(err)
      }
    },
    async deleteproduct({ commit }, product) {
      try {
        await connectServices.deleteProduct(product)
        commit('empty')
      } catch (err) {
        console.log(err)
      }
    }
  },
})
