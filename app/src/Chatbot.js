import React, { useMemo, useState, useRef, useCallback } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import Modal from 'react-modal';
import Draggable from 'react-draggable';
import './Chatbot.css';
import { FaRedo, FaMinus } from 'react-icons/fa';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Chatbot = () => {
  const directLine = useMemo(() =>
    createDirectLine({
secret: 'LGahegi75DU.DXK4riQUrG4eKS7NTL1PO3ty3ajm2Au3pK_ElN5sfLw',
    })
  );

  const chatRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  // const [isListening, setIsListening] = useState(false);
  // const [transcription, setTranscription] = useState('');
  const [chatKey, setChatKey] = useState(0);
  const [chatData, setChatData] = useState([]); // Store chat data in state
  const [isChatButtonVisible, setChatButtonVisible] = useState(true);

  const handleRefresh = () => {
    setChatKey((prevKey) => prevKey + 1);
  };

  const handleClose = () => {
    setIsModalOpen(false);
   
  };

  const handleMaximizeMinimize = () => {
   
    // setIsModalOpen((prev) => !prev);
    setIsMinimized((prev) => !prev);
    setIsModalOpen(false);
    setChatButtonVisible(true); // Show the chat button when closing the modal
    localStorage.setItem('chatButtonVisibility', JSON.stringify(true));
  
    
     // setChatData(chatRef.current.getCurrentTranscript()); // Save chat data before closing
   
  };

 
  const handleChatRendered = useCallback(() => {
    // Scroll to the bottom of the chat when it's refreshed
    if (chatRef.current) {
      chatRef.current.scrollDown();
    }
  }, []);

  const handleChatButtonClick = () => {
    setChatButtonVisible(false);
    localStorage.setItem('chatButtonVisibility', JSON.stringify(false));
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* <Draggable>
        <button className='Chat-btn' onClick={() => setIsModalOpen(true)}>Open Chatbot</button>
      </Draggable> */}
      {isChatButtonVisible && (
  <Draggable>
    <button className='Chat-btn' onClick={() => setIsModalOpen(true)}>Open Chatbot</button>
  </Draggable>
)}


      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        contentLabel="Chatbot Modal"
        overlayClassName="modal-overlay"
        className={`chatbot-modal ${isMinimized ? 'minimized' : ''}`}
      >
        <div className="chat-header">
          <div className="chat-title">Chatbot</div>
          <div className="chat-icons">
            <button onClick={handleRefresh}>
              <FaRedo />
            </button>
            <button onClick={handleClose}>X</button>
            <button onClick={handleMaximizeMinimize}>
              {isMinimized ? '' : ''}<FaMinus />
            </button>
          
          </div>
        </div>

        {!isMinimized && (
          <div className="react-web-chat">
            <ReactWebChat
              key={chatKey}
  directLine={directLine}
  onRender={handleChatRendered}
  ref={(ref) => (chatRef.current = ref)}
              style={{ height: 'calc(100% - 50px)', overflowY: 'auto' ,  borderRadius: '100px',}}

              
              transcript={chatData} // Set chat data to preserve previous messages
              onRenderActivity={({ activity }) =>
                activity.type === 'message' ? (
                  <div className="custom-input" >
                    <input style={{border:'10px solid black',}} type="text" placeholder="Type a message" />
                    
                  </div>
                ) : null
              }
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Chatbot;
