import InfoIcon from '@mui/icons-material/InfoOutlined';
import { Box, Tooltip, Typography } from "@mui/material";
import MarkdownPreviewer from '@uiw/react-markdown-preview';
import VideoPlayer from 'react-player';
import { Fields, Nodes } from "../constants/constants";
import { Element } from "../model";
import FormElementItem from "./Element";

import pageVideo from '../assets/page.mov';
import nodeVideo from '../assets/node.mov';

interface SidebarElement {
  title: string;
  description: string;
  elements: Element[];
  tutorialVideo: string;
}

const sidebarElements: SidebarElement[] = [
  {
    title: 'Nodes',
    description: 'Nodes are the building blocks of your form. They can be dragged and dropped inside the dropzone to compose the form and establish the relationship between entities, forms, and pages. Here are some key points to remember:\n\n- **Entity**: An entity can only be connected to one form.\n- **Form**: A form can be connected to one or many pages.\n- **Entity-Page Connection**: An entity cannot be directly connected to a page.',
    elements: Nodes,
    tutorialVideo: nodeVideo,
  },
  {
    title: 'Fields',
    description: 'Fields are the elements that can be added to your pages. They can only be dropped inside a page.',
    elements: Fields,
    tutorialVideo: pageVideo,
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
            <VideoPlayer url={element.tutorialVideo} playing loop muted width="100%" height="100%" />
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
