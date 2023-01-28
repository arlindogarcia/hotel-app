import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const Pagination = ({ itemsPerPage, totalItems }: { itemsPerPage: number; totalItems: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Flex mt={4} justifyContent="center" alignItems="center" my={2}>
      <Button colorScheme="gray" mr={2} onClick={() => handlePageChange(currentPage - 1)} isDisabled={currentPage === 1}>
        Anterior
      </Button>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button key={i + 1} colorScheme={currentPage === i + 1 ? 'teal' : 'gray'} mr={2} onClick={() => handlePageChange(i + 1)}>
          {i + 1}
        </Button>
      ))}
      <Button colorScheme="gray" onClick={() => handlePageChange(currentPage + 1)} isDisabled={currentPage === totalPages}>
        Próxima
      </Button>
    </Flex>
  );
}

export default Pagination;