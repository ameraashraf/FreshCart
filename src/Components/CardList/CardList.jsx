import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../Loader/Loader";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CardList({ title, ApiUrl, path }) {
  // Function to fetch data from the given API URL
  // This function makes the component reusable for different types of data (e.g., brands, products, categories)
  async function fetchData() {
    try {
      const response = await axios.get(ApiUrl);
      // The function must return the data so that useQuery can handle it properly
      return response.data;
    } catch (error) {
      console.log(" component error", error);
      // Throw an error with a meaningful message for better error handling
      throw new Error(error.response?.data?.message || "Failed to fetch data");
    }
  }

  // useQuery Hook to fetch and cache data
  // It handles loading, error, and success states automatically
  // The query key `fetchData${title}` ensures each request is cached separately
  const { data, isLoading, isError, error } = useQuery(
    `fetchData${title}`,
    fetchData
  );

  // Show a loading spinner while data is being fetched
  if (isLoading) {
    return <Loader />;
  }

  // Show an error message if the API request fails
  if (isError) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <>
      <div className={`container my-5 `}>
        {/* Dynamic title based on the data type (e.g., brands, products, etc.) */}
        <h1 className={` text-center mb-3 mb-md-5 text-uppercase`}>{title}</h1>

        <div className="row gy-4 ">
          {/* Loop through the fetched data and render each item */}
          {data?.data?.map(function ({ _id, name, image }) {
            return (
              <div key={_id} className="col-lg-3 col-md-6 cursor-pointer ">
                {/* Link to a specific item page using dynamic path */}
                <Link to={`${path}/${_id}/${encodeURIComponent(name)}`}>
                  <div
                    className={`card overflow-hidden	 ${styles.cardContent} `}
                  >
                    {/* Display the item image inside a styled figure element */}
                    <figure className="d-flex align-items-center justify-content-center bg-white">
                      <LazyLoadImage
                        className={`${styles.cardImage}`}
                        src={image}
                        alt={name}
                        effect="blur"
                      />
                    </figure>

                    {/* Display the item name */}
                    <figcaption className="card-body">
                      <h5 className="card-titler ">{name}</h5>
                    </figcaption>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CardList;
