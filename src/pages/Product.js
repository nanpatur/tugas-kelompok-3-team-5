import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";

const api = "http://localhost:3001/products";

const Product = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const fetchProducts = async () => {
    try {
      const productsResponse = await axios.get(api);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      // eslint-disable-next-line no-restricted-globals
      let isConfirm = confirm(`Yakin ingin menghapus produk ini?`);
      if (isConfirm) {
        await axios.delete(api + '/' + productId);
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      fetchProducts();
  }, []);

  var currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <Layout>
      <div className="p-5">
        <div class="row g-0">
          <div class="col-md-10">
            <h3 className="mb-3">Daftar Produk</h3>
          </div>
          <div class="col-md-2">
            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="button" onClick={() => history.push('/produk/form')}>
                Tambah Produk +
              </button>
            </div>
          </div>
        </div>
        {products.map((product) => (
          <div class="card mb-3 p-3">
            <div class="row g-0">
              <div class="col-md-2">
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                  }}
                  src={product.picture_url}
                  class="card-img-top"
                  alt={product.name}
                />
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h4 class="card-title">{product.name}</h4>
                  <p class="card-text">
                    {product.description?.slice(0, 200)}...
                  </p>
                  <p class="card-text">
                    Harga Beli: {currencyFormatter.format(product.unit_cost)}
                  </p>
                  <h5>
                    {currencyFormatter.format(product.price)}
                  </h5>
                </div>
              </div>
              <div class="col-md-1">
                <div class="d-grid gap-2">
                  <button class="btn btn-outline-secondary" type="button" onClick={() => history.push('/produk/form?product_id=' + product.id)}>
                    Ubah
                  </button>
                  <button class="btn btn-danger" type="button" onClick={() => deleteProduct(product.id)}>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Product;
