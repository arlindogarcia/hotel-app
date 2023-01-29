import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

type IPagination = {
  itemsPerPage: number;
  totalItems: number;
  onChange?: (val: number) => void;
}

const Pagination = ({ itemsPerPage, totalItems, onChange }: IPagination) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    typeof onChange === 'function' && onChange(page);
  };

  return (
    <Flex justifyContent="center" alignItems="center" py={6} wrap="wrap">
      {currentPage > 1 &&
        <Button color="teal" size="md" mr={1} colorScheme="gray" onClick={() => handlePageChange(currentPage - 1)}>
          {'< Anterior'}
        </Button>
      }
      <Button size="md" colorScheme='teal' mr={1}>
        {currentPage}
      </Button>
      <Text pl={2}>de</Text>
      <Button size="md" mr={1} colorScheme='gray'>
        {totalPages}
      </Button>

      {currentPage !== totalPages &&
        <Button color="teal" size="md" colorScheme="gray" onClick={() => handlePageChange(currentPage + 1)}>
          {'Seguinte >'}
        </Button>
      }
    </Flex>
  );
}

export default Pagination;