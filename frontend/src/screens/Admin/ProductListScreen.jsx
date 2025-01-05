import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";
import Loader from "../../components/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber});

  const deleteHandler = async (id) => {
    // Uncomment this block for production if delete functionality is enabled
    if (window.confirm('Are you sure')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product Deleted....')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
        toast.success("Product created successfully!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-800 via-teal-950 to-blue-50 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">Products</h1>
          <button
            onClick={createProductHandler}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transform transition-transform hover:scale-105 hover:bg-teal-600 active:scale-95"
          >
            <FaPlus className="inline-block mr-2" />
            Create Product
          </button>
        </div>
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader/>}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse border border-gray-300 bg-white shadow-lg rounded-lg transition-transform duration-500 hover:scale-105">
              <thead className="bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border border-gray-300">ID</th>
                  <th className="px-4 py-2 border border-gray-300">NAME</th>
                  <th className="px-4 py-2 border border-gray-300">PRICE</th>
                  <th className="px-4 py-2 border border-gray-300">CATEGORY</th>
                  <th className="px-4 py-2 border border-gray-300">BRAND</th>
                  <th className="px-4 py-2 border border-gray-300">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 transition-colors duration-300"
                  >
                    <td className="px-4 py-2 border border-gray-300">
                      {product._id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {product.name}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      ${product.price}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {product.category}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {product.brand}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 flex gap-2">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="text-blue-500 hover:text-blue-600 transform transition-transform hover:scale-105"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deleteHandler(product._id)}
                        className="text-red-500 hover:text-red-600 transform transition-transform hover:scale-105"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginate pages={data.pages} page={data.page} isAdmin={true}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListScreen;
