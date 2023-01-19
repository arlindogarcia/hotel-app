import {
  Badge,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

export type TableHeaders<T> = {
  label: string | React.Component | React.ReactFragment;
  render: (
    item: T,
    index: number
  ) => string | React.Component | React.ReactFragment | ReactNode;
  wrapped?: boolean;
};

export interface ResponsiveTableProps {
  headers: TableHeaders<any>[];
  data: Record<string, any>[];
  tfoot?: ReactNode;
  thead?: React.Component | React.ReactFragment;
  isSmall?: boolean;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  headers,
  data,
  tfoot,
  thead,
  isSmall,
}) => {
  return (
    <Table border="1px" borderColor="gray.300" variant="striped" colorScheme="blue" size={isSmall ? "sm" : "md"}>
      <Thead display={["none", "table-header-group"]}>
        <>
          <Tr>
            {headers.map((header, i) => (
              <Th key={`${i}`}>{header.label as string}</Th>
            ))}
          </Tr>
          {thead}
        </>
      </Thead>
      <Tbody>
        {!!data &&
          data.map((item, i) => (
            <Tr key={`${i}`}>
              {headers.map((header, j) =>
                header.wrapped ? (
                  <Td
                    key={`${j}`}
                    whiteSpace="nowrap"
                    width={["100%", "1%"]}
                    display={["block", "table-cell"]}
                  >
                    <>
                      <Badge display={["inline", "none"]} colorScheme="blue">
                        {header.label as string}
                      </Badge>
                      {header.render(item, i)}
                    </>
                  </Td>
                ) : (
                  <Td
                    key={`${j}`}
                    width="100%"
                    display={["block", "table-cell"]}
                  >
                    <>
                      <Badge display={["inline", "none"]} colorScheme="blue">
                        {header.label as string}
                      </Badge>
                      {header.render(item, i)}
                    </>
                  </Td>
                )
              )}
            </Tr>
          ))}
      </Tbody>
      {!!tfoot && <Tfoot>{tfoot}</Tfoot>}
    </Table>
  );
};

export default ResponsiveTable;
