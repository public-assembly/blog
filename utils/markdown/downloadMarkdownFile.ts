import { saveAs } from 'file-saver';
import MarkdownFileData from '../../types/markdownFileData'
import getValidMarkdownFilename from './getValidMarkdownFilename';

const downloadMarkdownFile = (fileData: MarkdownFileData) => {
  const blob = new Blob([fileData.markdown], {
    type: 'text/markdown;charset=utf-8',
  });
  saveAs(blob, getValidMarkdownFilename(fileData.filename));
};

export default downloadMarkdownFile;