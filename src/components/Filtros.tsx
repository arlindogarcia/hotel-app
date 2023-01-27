import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Heading } from "@chakra-ui/react"
import { Form, Formik } from "formik";
import React from "react"

interface IProps {
  children: React.ReactNode;
  label?: string;
  initialValues: Record<string, string | number | boolean>;
  onSubmit: (values: Record<string, string | number | boolean>) => void;
  isLoading?: boolean;
}

export const Filtros = ({ label = "FILTROS", children, initialValues, onSubmit, isLoading = false }: IProps) => {
  return (
    <Accordion my={2}>
      <AccordionItem bg="teal">
        <AccordionButton>
          <Heading size="sm" color="white">{label}</Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel bg="white" p={2}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => {
              typeof onSubmit === 'function' && onSubmit(values);
            }}
          >
            <Form>
              {children}

              <Button type="submit" mt={2} colorScheme="teal" isLoading={isLoading}>Filtrar</Button>
            </Form>
          </Formik>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}