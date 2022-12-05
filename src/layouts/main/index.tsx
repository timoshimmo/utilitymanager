import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Topbar from '../navigation/topbar';
import Sidebar from '../navigation/sidebar';
import { Provider } from "jotai";
import "react-toastify/dist/ReactToastify.css";
import { ModalProvider } from '../../components/ui/modal/modal.context';
import ManagedModal from "../../components/ui/modal/managed-modal";
import { ToastContainer } from "react-toastify";

function Main({ children }: InferProps<typeof Main.propTypes>) {
  return (
    <div className="h-screen max-h-screen w-full flex overflow-y-clip">
      <Provider>
        <ModalProvider>
          <>
            <div className="w-1/6 sticky bg-accent max-h-screen">
              <Sidebar />
            </div>
            <div className="h-screen max-h-screen w-5/6 flex flex-col bg-[#F5F5F5] pt-4 overflow-y-scroll">
              <Topbar />
              <main className="w-full block">{children}</main>
              <ToastContainer autoClose={2000} theme="colored" />
              <ManagedModal />
            </div>
          </>
        </ModalProvider>
      </Provider>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Main;
