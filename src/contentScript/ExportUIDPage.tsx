import { Textarea } from "@headlessui/react";
import IconLoading from "../components/IconLoading";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useEffect, useState, useRef } from "react";
import { removeCacheStorage } from "../helpers/functionHelpers";
import $ from 'jquery';

interface Member {
  UID: string;
  Name?: string;
}

interface ExportState {
  isLayoutExportUid: boolean;
  count: number;
  options: any[];
  arrUID: Member[];
  status: 'continue' | 'stop';
}

const ExportUIDPage = () => {
  // Các biến config được gom nhóm vào một object
  const configRef = useRef({
    isNextPage: true,
    postId: '',
    type: '',
    indexOption: 0,
    cursorEnd: null as string | null,
    timeoutId: null as NodeJS.Timeout | null,
    fb_dtsg: null as string | null,
    status: 'continue'
  });

  // Gom nhóm các state liên quan vào một state object
  const [state, setState] = useState<ExportState>({
    isLayoutExportUid: false,
    count: 0,
    options: [],
    arrUID: [],
    status: 'continue'
  });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Hàm helper để update state một cách immutable
  const updateState = (updates: Partial<ExportState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const getIdUrl = (url: string): string => {
    const parts = url.split('/');
    return parts.filter(item => item !== '').pop() || '';
  };

  const getCookie = (name: string): string => {
    const nameEq = name + '=';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEq) === 0) {
        return cookie.substring(nameEq.length);
      }
    }
    return '';
  };

  const groupID = getIdUrl(window.location.href);
  const userID = getCookie('c_user');

  const handleStop = () => {
    updateState({ status: 'stop' });
    configRef.current.status = 'stop';
    if (configRef.current.timeoutId) {
      clearTimeout(configRef.current.timeoutId);
    }
  };


  const handleContinue = () => {
    updateState({ status: 'continue' });
    configRef.current.status = 'continue';
    if (!configRef.current.isNextPage && !state.options[configRef.current.indexOption]) {
      finishSearchUid();
      return;
    }
    checkType(configRef.current.type, configRef.current.cursorEnd);
  };

  const handleClose = () => {
    updateState({ isLayoutExportUid: false, status: 'stop' });
    configRef.current.status = 'stop';
    removeCacheStorage();
    stopSearchUid();
  };

  const finishSearchUid = () => {
    stopSearchUid();
  };

  const stopSearchUid = () => {
    if (configRef.current.timeoutId !== null) {
      clearTimeout(configRef.current.timeoutId);
      configRef.current.timeoutId = null;
    }
  };

  const getQuantityMember = (): number => {
    if (textAreaRef.current) {
      return textAreaRef.current.value.split("\n").filter((line) => line !== "").length;
    }
    return 0;
  };

  const setListMemberUid = async (member: { id: string, name?: string }) => {
    let isValid = true;
    const isExisting = state.arrUID.some(item => item.UID === member.id);

    if (member.name && !isExisting) {
      if (member.id.length > 16 || ["Người dùng Facebook", "Facebook User", "Facebook user", "facebook user"].includes(member.name)) {
        isValid = false;
      }
      if (isValid) {
        const newMember = { 'UID': member.id, 'Name': member.name };
        updateState({
          arrUID: [newMember, ...state.arrUID] // Thêm phần tử mới vào đầu mảng
        });
        if (textAreaRef.current) {
          textAreaRef.current.value = `${member.id}|${member.name}\n` + textAreaRef.current.value;
        }
      }
    }

    if (member.id && !member.name) {
      const newMember = { 'UID': member.id };
      updateState({
        arrUID: [newMember, ...state.arrUID] // Thêm phần tử mới vào đầu mảng
      });
      if (textAreaRef.current) {
        textAreaRef.current.value = member.id + '\n' + textAreaRef.current.value;
      }
    }
  };

  const getUIdMembersGroup = async (apiUrl: string, userId: string, groupId: string, cursor: string | null = null) => {
    const requestData = {
      'av': userId,
      '__user': userId,
      '__a': 1,
      '__dyn': "7AzHK4HwkEng5K8G6EjBAg2owIxu13wFwnUW3q2ibwNw9G2Saw8i2S1DwUx60GE3Qwb-q7oc81xoswMwto886C11wBz83WwtohwGxu782lwv89kbxS2218wc61awko5m1mzXw8W58jwGzEaE5e7oqBwJK2W5olwuEjUlDw-wUwxwjFovUaU3VBwFKq2-azo6O14wwwOg2cwMwhEkxebwHwNxe6Uak0zU8oC1Hg6C13whEeE4WVU-4Edouw",
      '__csr': "l3A9gDkYIkxIlkl69W5lqJ8myhD4EiDbnSDaBlWiL9QGEjFbhti9j9kQCGjKrDT-jtd94y92ly4hGqEF2pq-h6Qp7WhGDy-dizpqRF2pFotAyU-fV4uppHUiLBG5obEWbDxbFwoqx2cBxaay8gxm3h38jzU5m3-2S8x6bwxwp8-i3i1zwFxG3e3S58bE98eU5i1Ewfmdwzw6KweC0a1w1Gq0d6w05mxw8S08ow3pE0GS0sC02tC5o0J-1MwdW0vC0dXCw13vyFGg0205w3K8y13BDgG05V8",
      '__hsi': 0x660fcec73e49b800,
      '__comet_req': 15,
      'fb_dtsg': configRef.current.fb_dtsg,
      'jazoest': 0x6417,
      'lsd': "gev7cofpOqIHSoBfdhSxNR",
      'fb_api_caller_class': "RelayModern",
      'fb_api_req_friendly_name': "GroupsCometMembersPageNewMembersSectionRefetchQuery",
      'variables': JSON.stringify({
        'count': 10,
        'cursor': cursor,
        'groupID': groupId,
        'scale': 1.5,
        'id': groupId
      }),
      'doc_id': 0x199d031e73c95f
    };
    console.log(requestData)
    if (configRef.current.timeoutId) {
      clearTimeout(configRef.current.timeoutId);
      configRef.current.timeoutId = null;
    }
    if (configRef.current.status === "continue") {
      configRef.current.timeoutId = setTimeout(async () => {
        // console.log('có chạy vào đây')
        $.ajax({
          'type': "POST",
          'url': apiUrl,
          'data': requestData
        }).done(async (response: any) => {
          const data = JSON.parse(response);
          if (!data?.data?.node) {
            getUIdMembersGroup(apiUrl, userId, groupId, configRef.current.cursorEnd);
            // console.log('Không có data');
            return;
          }
          const members = data.data.node.new_members.edges;
          configRef.current.isNextPage = data.data.node.new_members.page_info.has_next_page;
          configRef.current.cursorEnd = data.data.node.new_members.page_info.end_cursor;

          members.forEach((member: any) => {
            setListMemberUid({ 'id': member.node.id, 'name': member.node.name });
            // console.log('member', member)

          });

          updateState({ count: getQuantityMember() });

          if (configRef.current.isNextPage) {
            await getUIdMembersGroup(apiUrl, userId, groupId, configRef.current.cursorEnd);
            // console.log('Có next page');
          } else {
            // console.log('Không có next page');
            finishSearchUid();
          }
        }).fail(() => {
          // console.log('Lỗi');
          stopSearchUid();
        });
      }, 1500);
      return;
    }
    stopSearchUid();
  };

  const index = async (actionType: string) => {
    if (!configRef.current.fb_dtsg) {
      chrome.runtime.sendMessage({ action: 'FB_DTSG', c_user: userID }, (response) => {
        if (response) {
          configRef.current.fb_dtsg = response;
          window.localStorage.setItem("fb_dtsg", JSON.stringify(response));
          checkType(actionType);
        } else {
          console.log('Không thể lấy được token');
        }
      });
      return;
    }
    checkType(actionType);
  }

  const checkType = async (type: string, additionalParam: string | null = null) => {
    switch (type) {
      case "group":
        if (additionalParam && userID) {
          await getUIdMembersGroup("https://www.facebook.com/api/graphql", userID, groupID, additionalParam);
        } else {
          await getUIdMembersGroup("https://www.facebook.com/api/graphql", userID || '0', groupID);
        }

        break;
    }
  };

  useEffect(() => {
    chrome.storage.local.get(["data"], async (storageData) => {
      if (storageData.data && storageData.data.active) {
        updateState({
          isLayoutExportUid: true,
          options: storageData.data.options
        });
        configRef.current.type = storageData.data.type;
        index(storageData.data.type);
      }
    });
  }, []);

  return (
    <>
      {state.isLayoutExportUid && (
        <div className='fbtxt_container relative'>
          <button
            className="absolute bg-white py-1 px-[10px] rounded-full text-black border shadow hover:text-gray-700 focus:outline-none"
            style={{ right: "-5px", top: "-5px" }}
            onClick={handleClose}
          >
            X
          </button>
          <div className='flex items-center justify-between mt-4'>
            <div>
              {state.status === "continue" ? (
                <div className="flex items-center gap-2">
                  <IconLoading size={16} />
                  <p className='text-sm'>Đang quét <span className="text-red-500">({state.count})</span></p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className='text-sm'>Đã quét được <span className="text-red-500">({state.count})</span></p>
                </div>
              )}

            </div>
            <div>
              {state.status === "continue" ? (
                <button onClick={handleStop} className='bg-red-500 text-white font-bold py-2 px-4 rounded-lg'>
                  Dừng
                </button>
              ) : (
                <button onClick={handleContinue} className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg'>
                  Tiếp tục
                </button>
              )}
            </div>
          </div>
          <div style={{ margin: "10px 0px" }}>
            <Textarea
              ref={textAreaRef}
              id='textAreaInput'
              rows={8}
              className="w-full p-2 resize-none rounded-lg border outline-none focus:border-blue-500"
            />
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className='bg-green-500 text-white font-bold py-2 px-4 rounded-lg'>
                  Xuất file
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Xuất file Excel
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Xuất file TXT
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
            <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg'>
              Copy
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportUIDPage;
