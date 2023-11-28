import { CORE_SETUP } from "globals/configs";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  useGetOrganizationsQuery,
  useSwitchOrganizationQuery,
} from "domain/interactors/auth";
import styled from "styled-components";
import { PrivateRouteLocationStateProps } from "presentation/router";
import { Role } from "@crstl/api/src/apis/models/User";
import { setNotification } from "domain/services/notification";
import { TEXT_CONSTANTS } from "presentation/texts-reservoir";
import { useHistory } from "react-router-dom";
import { tokenManagement } from "domain/interactors/auth/service";
import { Tooltip } from "antd";
import {
  SwitcherOutlined,
  DownOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";

const DropdownBox = styled.div`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  z-index: 1000;
  color: black;
  position: absolute;
  top: 50px;
  left: 30px;

  display: flex;
  flex-direction: column;
  min-width: 170px;
  z-index: 1000;
  .item {
    padding: 8px;
    cursor: pointer;
    &:hover {
      background-color: #e3e3e3;
    }
  }
`;

const TextWrapper = styled.span`
  font-weight: ${({ theme }) => theme.typography.WEIGHTS.MEDIUM};
  font-size: ${({ theme }) => theme.typography.SIZES.SM};
  color: ${({ theme }) => theme.palette.text.SECONDARY};
  margin-left: 4px;
  word-break: break-word;
  text-align: start;
  max-width: 70%;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LogoText = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  overflow: hidden;
`;

// create an interface with name and id
interface OrgType {
  id: string;
  name: string;
}

interface Props {
  name: string;
  userDataLoading: boolean;
}

const OrgNode = ({ name, userDataLoading }: Props) => {
  const { data: organizationsRes } = useGetOrganizationsQuery();
  const { mutate, isLoading: orgLoading } = useSwitchOrganizationQuery(true);
  const { state, search } = useLocation<PrivateRouteLocationStateProps>();
  const isMultiOrg = tokenManagement.getIsMultiOrg();
  const currentOrgId = tokenManagement.getOrg();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const orgNodeRef = useRef(null);
  const organizations = organizationsRes?.data || [];

  const handleOrgClick = () => {
    if (orgLoading || userDataLoading) return;
    setShowMenu(!showMenu);
  };

  const handleDocumentClick = (event: any) => {
    if (orgNodeRef?.current && !orgNodeRef?.current?.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleRowClick = (item: any) => {
    const payload = {
      organization_id: item.id,
    };
    mutate(payload, {
      onSuccess: async ({ role }) => {
        if (Role.Intake === role) {
          history.push({
            pathname: CORE_SETUP,
            state,
            search,
          });
        }
      },
      onError: (error: any) => {
        setNotification({
          type: "error",
          description: error.response?.data.general || "",
          moduleName:
            error.response?.data.message ||
            `${TEXT_CONSTANTS.ROUTER.SOMETHING_WENT_WRONG}. Please try again`,
        });
      },
    });
  };

  if (!isMultiOrg)
    return (
      <TextWrapper
        aria-hidden="true"
        style={{ cursor: "pointer", position: "relative" }}
      >
        <LogoText className="animate">{name}</LogoText>
      </TextWrapper>
    );
  const orgs = organizations
    .filter((org: OrgType) => org?.id !== currentOrgId)
    .sort((a: OrgType, b: OrgType) => a?.name?.localeCompare(b?.name));

  return (
    <>
      <TextWrapper
        onClick={handleOrgClick}
        ref={orgNodeRef}
        aria-hidden="true"
        style={{ cursor: "pointer", position: "relative" }}
      >
        <LogoText className="animate">{name}</LogoText>

        <Tooltip title={"Switch organization"}>
          <CaretDownOutlined style={{ fontSize: "14px" }} />
        </Tooltip>
      </TextWrapper>
      {showMenu && (
        <DropdownBox>
          {orgs.map((item: OrgType) => {
            return (
              <span
                key={item.id}
                onClick={() => handleRowClick(item)}
                aria-hidden="true"
                className="item"
              >
                {item.name}
              </span>
            );
          })}
        </DropdownBox>
      )}
    </>
  );
};

export default OrgNode;

