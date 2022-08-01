import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";

const api = "http://localhost:3001/products";

const ProductForm = () => {
  const [productData, setProductData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const history = useHistory();

  const getProductById = async (productId) => {
    try {
      const productsResponse = await axios.get(api + '/' + productId);
      setProductData(productsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postProduct = async (product) => {
    try {
      await axios.post(api, product);
      history.push("/produk");
    } catch (error) {
      console.error(error);
    }
  }

  const putProduct = async (product) => {
    try {
      await axios.put(api + '/' + product.id, product);
      history.push("/produk");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      const queryString = history.location.search
      const urlParams = new URLSearchParams(queryString);
      const productId = urlParams.get('product_id')
      if (productId) {
        getProductById(productId)
        setIsEditMode(true)
      }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: e.target.name?.value,
      description: e.target.description?.value,
      unit_cost: e.target.unit_cost?.value,
      price: e.target.price?.value,
      picture_url: e.target.picture_url?.value,
    }
    if (isEditMode) {
      putProduct({ ...productData, ...payload })
    } else {
      postProduct(productData)
    }
  }

  return (
    <Layout>
      <div className="p-5">
        <div class="card m-auto" style={{ width: '700px' }}>
          <h3 className="p-3">{isEditMode ? 'Ubah Produk' : 'Produk Baru'}</h3>
            <div class="card-body">
              <form onSubmit={onSubmit}>
                <div class="mb-3">
                  <label for="name" class="form-label">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    aria-describedby="name"
                    placeholder="Nama Produk"
                    defaultValue={productData?.name}
                  />
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">
                    Deskripsi
                  </label>
                  <textarea
                    class="form-control"
                    id="description"
                    aria-describedby="description"
                    placeholder="Deskripsi"
                    defaultValue={productData?.description}
                  />
                </div>
                <div class="mb-3">
                  <label for="unit_cost" class="form-label">
                    Harga Beli
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="unit_cost"
                    aria-describedby="unit_cost"
                    placeholder="Harga Beli"
                    defaultValue={productData?.unit_cost}
                  />
                </div>
                <div class="mb-3">
                  <label for="price" class="form-label">
                    Harga Jual
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    aria-describedby="price"
                    placeholder="Harga Jual"
                    defaultValue={productData?.price}
                  />
                </div>
                <div class="mb-3">
                  <label for="picture_url" class="form-label">
                    URL Gambar
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="picture_url"
                    aria-describedby="picture_url"
                    placeholder="URL Gambar"
                    defaultValue={productData?.picture_url}
                  />
                </div>
                <button type="submit" class="btn btn-primary me-2">
                  Simpan
                </button>
                <button type="button" class="btn btn-outline-secondary" onClick={() => history.push('/produk')}>
                  Batal
                </button>
              </form>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductForm;
