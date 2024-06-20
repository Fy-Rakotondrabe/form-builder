import InfoIcon from '@mui/icons-material/InfoOutlined';
import { Box, Tooltip, Typography } from "@mui/material";
import MarkdownPreviewer from '@uiw/react-markdown-preview';
import { Fields, Nodes } from "../constants/constants";
import { Element } from "../model";
import FormElementItem from "./Element";

interface SidebarElement {
  title: string;
  description: string;
  elements: Element[];
}

const sidebarElements: SidebarElement[] = [
  {
    title: 'Nodes',
    description: 'Nodes are the building blocks of your form. They can be dragged and dropped inside the dropzone to compose the form and establish the relationship between entities, and pages.',
    elements: Nodes,
  },
  {
    title: 'Fields',
    description: 'Fields are the elements that can be added to your pages. They can only be dropped inside a page.',
    elements: Fields,
  },
]

const renderSidebarElements = (element: SidebarElement, index: number) => (
  <Box sx={{ marginTop: index > 0 ? 2 : 0 }}>
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography fontWeight="bold" sx={{ marginLeft: 2, marginY: 1 }}>
        {element.title}
      </Typography>
      <Tooltip 
        arrow
        sx={{ marginRight: 1 }} 
        placement='right'
        title={
          <Box sx={{ padding: 1 }}>
            <MarkdownPreviewer source={element.description} style={{ fontSize: '0.8rem', backgroundColor: '#6d6d6d', color: 'white' }} />
          </Box>
        }
      >
        <InfoIcon />
      </Tooltip>
    </Box>
    {element.elements.map((formElement) => (
      <FormElementItem key={formElement.type} element={formElement} />
    ))}
  </Box>
);

const Sidebar = () => {
  return (
    <Box className="sidebar">
      {sidebarElements.map((element, index) => renderSidebarElements(element, index))}
    </Box>
  );
};

export default Sidebar;
