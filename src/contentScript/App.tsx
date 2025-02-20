import '../index.css'
import ExportUIDPage from './export/ExportUIDPage';
import ReactEmojiStory from './stories/ReactEmojiStory';
const App: React.FC = () => {

  return (
    <>
      <ExportUIDPage />
      <ReactEmojiStory />
    </>
  );
};

export default App;
