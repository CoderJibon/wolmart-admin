import React, { useEffect, useState } from "react";
import ProductPageHeader from "../../components/PageHeader/ProductPageHeader.jsx";
import toastify from "../../utils/toastify.jsx";
import { setMessageEmpty } from "../../features/Product/productSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "./Product.css";
const CreateProduct = () => {
  const [input, setInput] = useState({
    name: "",
    shortDesc: "",
    longDesc: "",
    specification: "",
    category: [],
    tags: [],
    brand: "",
  });
  // input fields update
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //use state
  const dispatch = useDispatch();
  const { error, message, products, brands, tags, category } = useSelector(
    (state) => state.product
  );

  // product type
  const [productType, setProductType] = useState("simple");

  //product type update
  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };

  //tag options
  const tagOptions = [];
  if (tags.length >= 0) {
    tags.forEach((tag) => {
      tagOptions.push({ value: tag._id, label: tag.name });
    });
  }
  //Category options
  const categoryOptions = [];
  if (category.length >= 0) {
    category.forEach((tag) => {
      categoryOptions.push({ value: tag._id, label: tag.name });
    });
  }

  const [selectCategory, setSelectCategory] = useState([]);
  const [selectTag, setSelectTag] = useState([]);
  const [productGallery, setProductGallery] = useState([]);
  const [productThumbnail, setProductThumbnail] = useState(null);
  const handleProductGallery = (e) => {
    const files = Array.from(e.target.files);
    setProductGallery((prevState) => [...prevState, ...files]);
  };

  //error handling
  useEffect(() => {
    if (error) {
      toastify("error", error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      toastify("success", message);
      dispatch(setMessageEmpty());
    }
  }, [error, message]);
  return (
    <div>
      {/* page header start */}
      <ProductPageHeader
        title="Create Product"
        btn="products"
        link="/products"
      />
      {/* page header end */}
      <div class="row">
        <div class="col-lg-12">
          <form action="#">
            <div class="card mb-2">
              <div class="card-header">
                <h4 class="card-title">Create Product</h4>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label class="col-form-label col-md-1">Title</label>
                  <div class="col-md-12">
                    <input
                      value={input.name}
                      onChange={handleInputChange}
                      name="name"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-1">
              <div class="card-body">
                <div class="form-group">
                  <label class="col-form-label col-md-2">Description</label>
                  <div class="col-md-12">
                    <textarea
                      name="longDesc"
                      onChange={handleInputChange}
                      rows="15"
                      cols="15"
                      class="form-control"
                      placeholder="Enter text here"
                    >
                      {input.longDesc}
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="card mb-1">
              <div class="card-body">
                <div class="form-group">
                  <label class="col-form-label col-md-2">
                    Sort Description
                  </label>
                  <div class="col-md-12">
                    <textarea
                      onChange={handleInputChange}
                      name="shortDesc"
                      rows="3"
                      cols="3"
                      class="form-control"
                      placeholder="Enter text here"
                    >
                      {input.shortDesc}
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 d-flex">
                <div class="card flex-fill">
                  <div class="card-body">
                    <div class="form-group ">
                      <label class=" col-form-label">Product Type</label>
                      <div class="">
                        <select
                          onChange={handleProductTypeChange}
                          class="form-control"
                        >
                          <option value="simple">Simple Product</option>
                          <option value="variable">Variable Product</option>
                          <option value="group">Group Product</option>
                          <option value="external">External Product</option>
                        </select>
                      </div>
                    </div>

                    {productType === "simple" && (
                      <>
                        <div class="form-group mb-2">
                          <label class="col-form-label">Regular Price</label>
                          <div class="">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="form-group mb-2">
                          <label class="col-form-label">Sale Price</label>
                          <div class="">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="form-group mb-2">
                          <label class="col-form-label">Sku</label>
                          <div class="">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="form-group mb-2 ">
                          <label class="col-form-label">Stock</label>
                          <div class="">
                            <input type="number" min={0} class="form-control" />
                          </div>
                        </div>
                      </>
                    )}
                    {productType === "variable" && <>variable product</>}
                    {productType === "group" && <>group product</>}
                    {productType === "external" && (
                      <>
                        <div class="form-group mb-2">
                          <label class="col-form-label">Regular Price</label>
                          <div class="">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="form-group mb-2">
                          <label class="col-form-label">Sale Price</label>
                          <div class="">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="form-group mb-2">
                          <label class="col-form-label">Sku</label>
                          <div class="">
                            <input type="text" class="form-control" />
                          </div>
                        </div>
                        <div class="form-group mb-2 ">
                          <label class="col-form-label">Stock</label>
                          <div class="">
                            <input type="number" min={0} class="form-control" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div class="col-xl-6 d-flex">
                <div class="card flex-fill">
                  <div class="card-body">
                    <div class="form-group ">
                      <label class=" col-form-label">Brand</label>
                      <div class="">
                        <select
                          onChange={handleInputChange}
                          name="brand"
                          class="form-control"
                        >
                          <option value="">--Select--</option>
                          {[
                            brands.map((item) => {
                              return (
                                <option key={item._id} value={item._id}>
                                  {item.name}
                                </option>
                              );
                            }),
                          ]}
                        </select>
                      </div>
                    </div>
                    <div class="form-group ">
                      <label class=" col-form-label">Category</label>
                      <div class="">
                        <Select
                          value={selectCategory}
                          onChange={(category) => setSelectCategory(category)}
                          isMulti
                          class="form-control"
                          options={categoryOptions}
                        />
                      </div>
                    </div>
                    <div class="form-group ">
                      <label class=" col-form-label">Tags</label>
                      <div class="">
                        <Select
                          value={selectTag}
                          onChange={(tag) => setSelectTag(tag)}
                          isMulti
                          class="form-control"
                          options={tagOptions}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Product Thumbnail</label>
                      <input
                        onChange={(e) => setProductThumbnail(e.target.files[0])}
                        type="file"
                        name="productThumbnail"
                        class="form-control"
                      />

                      {productThumbnail && (
                        <div className="imageGall">
                          <div className="imageGallitem">
                            <button className="">
                              <i className="fa fa-trash"></i>
                            </button>
                            <img
                              src={URL.createObjectURL(productThumbnail)}
                              alt=""
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div class="form-group">
                      <label>Product Gallery</label>
                      <input
                        onChange={handleProductGallery}
                        name="productGallery"
                        type="file"
                        multiple
                        class="form-control"
                      />
                      <div className="imageGall">
                        {productGallery &&
                          productGallery.map((item, index) => {
                            return (
                              <div key={index} className="imageGallitem">
                                <button className="">
                                  <i className="fa fa-trash"></i>
                                </button>
                                <img src={URL.createObjectURL(item)} alt="" />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-1">
              <div class="card-body">
                <div class="form-group">
                  <label class="col-form-label col-md-2">Specification</label>
                  <div class="col-md-12">
                    <textarea
                      style={{ minHeight: "70px" }}
                      onChange={handleInputChange}
                      name="specification"
                      rows="3"
                      cols="3"
                      class="form-control"
                      placeholder="Enter text here"
                    >
                      {input.specification}
                    </textarea>
                  </div>
                </div>
                <div class="text-right">
                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
