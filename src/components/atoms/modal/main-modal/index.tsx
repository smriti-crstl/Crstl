import { Modal as AntDModal, ModalProps } from "antd";
import { ReactElement, ReactNode } from "react";

export interface IModalProps extends ModalProps {
  children?: ReactNode;
}

export const Modal = ({ children, ...rest }: IModalProps): ReactElement => {
  return <AntDModal {...rest}>{children}</AntDModal>;
};
