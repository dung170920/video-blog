import { Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { FilterTag, LoadingPage } from "../components";
import { getAllCategories } from "../services/categories.service";

const Browse = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [activeLink, setActiveLink] = useState("0");
  const [categories, setCategories] = useState([]);

  const handleActive = () => {
    if (id) setActiveLink(id);
    else setActiveLink("0");
  };

  useEffect(() => {
    setLoading(true);
    getAllCategories().then((response) => {
      setLoading(false);
      setCategories(response);
      //console.log(response);
    });
  }, []);

  useEffect(() => {
    handleActive();
  }, [id]);

  if (loading) return <LoadingPage msg="Please wait to loading page" />;

  return (
    <>
      <Heading as="h2" fontSize="48px" fontWeight="semibold">
        Browse
      </Heading>
      <Flex mt="64px" alignItems="center" mb="8">
        <Flex gap="2">
          <Link to="">
            <FilterTag active={activeLink === "0" ? true : false}>
              All
            </FilterTag>
          </Link>

          {categories.map((category) => (
            <Link
              to={`category/${category.ID}`}
              key={category.ID}
              // onClick={handleActive}
            >
              <FilterTag active={activeLink === category.ID ? true : false}>
                {category.name}
              </FilterTag>
            </Link>
          ))}
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
};

export default Browse;
