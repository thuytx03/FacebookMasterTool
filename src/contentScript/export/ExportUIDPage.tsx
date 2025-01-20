import { Textarea } from "@headlessui/react";
import IconLoading from "../../components/IconLoading";
import { useEffect, useState, useRef, useMemo } from "react";
import { copyToClipboard, getUserID, removeCacheStorage } from "../../helpers/functionHelpers";
import $ from 'jquery';
import { ExportState } from "../../types/uid";
import ExportMemberToExcel from "../../components/export/ExportMemberToExcel";
import { exportToTXT } from "../../helpers/exportHelpers";

const ExportUIDPage = () => {
  const fileName = "danh_sach_uid_txt_" + new Date().getTime();
  let postId = '';
  let options: any[] = [];
  let indexOption = 0;

  const configRef = useRef({
    indexOption: 0,
    isNextPage: true,
    type: '',
    cursorEnd: null as string | null,
    timeoutId: null as NodeJS.Timeout | null,
    fb_dtsg: null as string | null,
    status: 'continue',
  });

  const [state, setState] = useState<ExportState>({
    isLayoutExportUid: false,
    count: 0,
    options: [],
    arrUID: [],
    status: 'continue',
    success: false
  });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const updateState = (updates: Partial<ExportState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const getIdUrl = (url: string): string => {
    const parts = url.split('/');
    return parts.filter(item => item !== '').pop() || '';
  };
  const checkUidPost = (url: string) => {
    const id = getIdUrl(url);
    return id.startsWith("pfbid");
  }
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
    if (!configRef.current.isNextPage && !options[indexOption]) {
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
    updateState({ status: 'stop', success: true });
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

  const setListMemberUid = async (member: { id: string, name?: string, url?: string }) => {
    let isValid = true;
    const isExisting = state.arrUID.some(item => item.uid === member.id);

    if (member.name && !isExisting) {
      if (member.id.length > 16 || ["Người dùng Facebook", "Facebook User", "Facebook user", "facebook user"].includes(member.name)) {
        isValid = false;
      }
      if (isValid) {
        const newMember = { uid: member.id, name: member.name, url: member.url };

        setState(prevState => ({
          ...prevState,
          arrUID: [newMember, ...prevState.arrUID] // Thêm phần tử mới nhất vào đầu mảng
        }));

        if (textAreaRef.current) {
          textAreaRef.current.value = `${member.id}|${member.name}\n` + textAreaRef.current.value;
        }
      }
    }

    if (member.id && !member.name) {
      const newMember = { uid: member.id };
      setState(prevState => ({
        ...prevState,
        arrUID: [newMember, ...prevState.arrUID] // Thêm phần tử mới nhất vào đầu mảng
      }));

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
    // console.log(requestData)
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
            setListMemberUid({ 'id': member.node.id, 'name': member.node.name, 'url': member.node.url });
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

  const getUidInPost = async (apiUrl: string, postId: string, option: any, cursor: any = null) => {
    switch (option) {
      case "comment":
        if (cursor) {
          await getUidCommentInPost(apiUrl, postId, cursor);
        } else {
          await getUidCommentInPost(apiUrl, postId);
        }
        break;
      case 'like':
        if (cursor) {
          await getUidReactorsInPost(apiUrl, postId, cursor);
        } else {
          await getUidReactorsInPost(apiUrl, postId);
        }
        break;
      case "share":
        if (cursor) {
          await getUidShareInPost(apiUrl, postId, cursor);
        } else {
          await getUidShareInPost(apiUrl, postId);
        }
        break;
      default:
        finishSearchUid();
    }
  }

  const getUidCommentInPost = async (apiUrl: string, postId: string, cursor: any = null) => {
    const requestData = {
      'av': userID,
      '__user': userID,
      '__a': 1,
      '__dyn': '',
      '__req': '1c',
      '__be': 1,
      '__pc': "PHASED: ufi_home_page_pkg",
      'dpr': 1,
      '__comet_req': false,
      'fb_dtsg': configRef.current.fb_dtsg,
      'jazoest': 0x63cf,
      '__ccg': 'GOOD',
      '__rev': 0x3c8e5ef1,
      '__spin_r': 0x3c8e5ef1,
      '__spin_b': 'trunk',
      '__spin_t': Date.now(),
      'fb_api_caller_class': "RelayModern",
      'fb_api_req_friendly_name': "CometUFICommentsProviderPaginationQuery",
      'variables': cursor ? JSON.stringify({
        'after': cursor,
        'before': null,
        'displayCommentsFeedbackContext': null,
        'displayCommentsContextEnableComment': null,
        'displayCommentsContextIsAdPreview': null,
        'displayCommentsContextIsAggregatedShare': null,
        'displayCommentsContextIsStorySet': null,
        'feedLocation': 'NEWSFEED',
        'feedbackID': btoa("feedback:" + postId),
        'feedbackSource': 1,
        'first': 10,
        'focusCommentID': null,
        'includeHighlightedComments': false,
        'includeNestedComments': true,
        'initialViewOption': 'RANKED_THREADED',
        'isInitialFetch': false,
        'isPaginating': true,
        'last': null,
        'scale': 1,
        'topLevelViewOption': null,
        'useDefaultActor': false,
        'viewOption': null,
        'UFI2CommentsProvider_commentsKey': 'CometModernHomeFeedQuery'
      }) : JSON.stringify({
        'after': null,
        'before': null,
        'displayCommentsFeedbackContext': null,
        'displayCommentsContextEnableComment': null,
        'displayCommentsContextIsAdPreview': null,
        'displayCommentsContextIsAggregatedShare': null,
        'displayCommentsContextIsStorySet': null,
        'feedLocation': "NEWSFEED",
        'feedbackID': btoa("feedback:" + postId),
        'feedbackSource': 1,
        'first': 10,
        'focusCommentID': null,
        'includeHighlightedComments': false,
        'includeNestedComments': true,
        'initialViewOption': "RANKED_THREADED",
        'isInitialFetch': false,
        'isPaginating': true,
        'last': null,
        'scale': 1,
        'topLevelViewOption': null,
        'useDefaultActor': false,
        'viewOption': null,
        'UFI2CommentsProvider_commentsKey': "CometModernHomeFeedQuery"
      }),
      'server_timestamps': true,
      'doc_id': 0x142a50c63c43a1
    };

    if (configRef.current.timeoutId) {
      clearTimeout(configRef.current.timeoutId);
      configRef.current.timeoutId = null;
    }

    if (configRef.current.status === "continue") {
      configRef.current.timeoutId = setTimeout(() => {
        $.ajax({
          'type': 'POST',
          'url': apiUrl,
          'data': requestData,
          'success': async function (response) {
            const data = JSON.parse(response);
            console.log("Running here", data);
            const comments = data.data.feedback.display_comments.edges;
            configRef.current.cursorEnd = data.data.feedback.display_comments.page_info.end_cursor;
            configRef.current.isNextPage = data.data.feedback.display_comments.page_info.has_next_page;
            if (!comments || !comments.length) {
              indexOption += 1;
              getUidInPost(apiUrl, postId, options[indexOption]);
              return;
            }
            comments.forEach((comment: any) => {
              const authorId = comment.node.author.id;
              const authorName = comment.node.author.name;
              setListMemberUid({ 'id': authorId, 'name': authorName });
            });

            updateState({ count: getQuantityMember() });

            if (configRef.current.isNextPage) {
              await getUidCommentInPost(apiUrl, postId, configRef.current.cursorEnd);
            } else {
              indexOption += 1;
              getUidInPost(apiUrl, postId, options[indexOption]);
            }
          },
          'error': function () {
            stopSearchUid();
          }
        });
      }, 1500);
      return;
    }
    stopSearchUid();
  }
  const getUidShareInPost = async (apiUrl: string, postId: string, cursor: any = null) => {
    const requestData = {
      'av': userID,
      '__user': userID,
      '__a': 1,
      '__dyn': '',
      '__req': '1c',
      '__be': 1,
      '__pc': "PHASED: ufi_home_page_pkg",
      'dpr': 1,
      '__comet_req': false,
      'fb_dtsg': configRef.current.fb_dtsg,
      'jazoest': 0x63cf,
      '__ccg': "GOOD",
      '__rev': 0x3c8e5ef1,
      '__spin_r': 0x3c8e5ef1,
      '__spin_b': "trunk",
      '__spin_t': Date.now(),
      'fb_api_caller_class': 'RelayModern',
      'fb_api_req_friendly_name': 'CometResharesFeedPaginationQuery',
      'variables': cursor ? JSON.stringify({
        'UFI2CommentsProvider_commentsKey': 'CometResharesDialogQuery',
        'count': 1,
        'cursor': cursor,
        'displayCommentsContextEnableComment': null,
        'displayCommentsContextIsAdPreview': null,
        'displayCommentsContextIsAggregatedShare': null,
        'displayCommentsContextIsStorySet': null,
        'displayCommentsFeedbackContext': null,
        'feedLocation': "SHARE_OVERLAY",
        'feedbackSource': 1,
        'focusCommentID': null,
        'privacySelectorRenderLocation': "COMET_STREAM",
        'renderLocation': 'reshares_dialog',
        'scale': 1,
        'useDefaultActor': false,
        'id': btoa('feedback:' + postId)
      }) : JSON.stringify({
        'UFI2CommentsProvider_commentsKey': 'CometResharesDialogQuery',
        'count': 1,
        'cursor': null,
        'displayCommentsContextEnableComment': null,
        'displayCommentsContextIsAdPreview': null,
        'displayCommentsContextIsAggregatedShare': null,
        'displayCommentsContextIsStorySet': null,
        'displayCommentsFeedbackContext': null,
        'feedLocation': 'SHARE_OVERLAY',
        'feedbackSource': 1,
        'focusCommentID': null,
        'privacySelectorRenderLocation': "COMET_STREAM",
        'renderLocation': "reshares_dialog",
        'scale': 1,
        'useDefaultActor': false,
        'id': btoa('feedback:' + postId)
      }),
      'server_timestamps': true,
      'doc_id': 0xfd9b51ddbe49f
    };

    if (configRef.current.timeoutId) {
      clearTimeout(configRef.current.timeoutId);
      configRef.current.timeoutId = null;
    }

    if (configRef.current.status === "continue") {
      configRef.current.timeoutId = setTimeout(() => {
        $.ajax({
          'type': "POST",
          'url': apiUrl,
          'data': requestData,
          'success': async function (response) {
            const data = JSON.parse(response);
            const shares = data.data.node.reshares.edges;
            configRef.current.cursorEnd = data.data.node.reshares.page_info.end_cursor;
            configRef.current.isNextPage = data.data.node.reshares.page_info.has_next_page;
            if (!shares || !shares.length) {
              indexOption += 1;
              getUidInPost(apiUrl, postId, options[indexOption]);
              return;
            }
            shares.forEach((share: any) => {
              const shareId = share.node.comet_sections.context_layout.story.comet_sections.title.story.actors[0].id;
              const shareName = share.node.comet_sections.context_layout.story.comet_sections.title.story.actors[0].name;
              setListMemberUid({ 'id': shareId, 'name': shareName });
            });
            updateState({ count: getQuantityMember() });

            if (configRef.current.isNextPage) {
              await getUidShareInPost(apiUrl, postId, configRef.current.cursorEnd);
            } else {
              indexOption += 1;
              getUidInPost(apiUrl, postId, options[indexOption]);
            }
          },
          'error': function () {
            stopSearchUid();
          }
        });
      }, 1500);
      return;
    }
    stopSearchUid();
  }
  const getUidReactorsInPost = async (apiUrl: string, postId: string, cursor: any = null) => {
    const requestData = {
      'av': userID,
      '__user': userID,
      '__a': 1,
      '__dyn': '',
      '__req': '1c',
      '__be': 1,
      '__pc': "PHASED: ufi_home_page_pkg",
      'dpr': 1,
      '__comet_req': false,
      'fb_dtsg': configRef.current.fb_dtsg,
      'jazoest': 0x63cf,
      '__ccg': 'GOOD',
      '__rev': 0x3c8e5ef1,
      '__spin_r': 0x3c8e5ef1,
      '__spin_b': 'trunk',
      '__spin_t': Date.now(),
      'fb_api_caller_class': "RelayModern",
      'fb_api_req_friendly_name': 'CometUFIReactionsDialogTabContentRefetchQuery',
      'variables': cursor ? JSON.stringify({
        'count': 10,
        'cursor': cursor,
        'feedbackTargetID': btoa("feedback:" + postId),
        'reactionType': 'NONE',
        'scale': 1,
        'id': btoa('feedback:' + postId)
      }) : JSON.stringify({
        'count': 10,
        'cursor': null,
        'feedbackTargetID': btoa('feedback:' + postId),
        'reactionType': "NONE",
        'scale': 1,
        'id': btoa("feedback:" + postId)
      }),
      'server_timestamps': true,
      'doc_id': 0xe2cfe796cc080
    };

    if (configRef.current.timeoutId) {
      clearTimeout(configRef.current.timeoutId);
      configRef.current.timeoutId = null;
    }

    if (configRef.current.status === "continue") {

      configRef.current.timeoutId = setTimeout(() => {
        $.ajax({
          'type': 'POST',
          'url': apiUrl,
          'data': requestData,
          'success': async function (response) {
            const data = JSON.parse(response);
            const reactors = data.data.node.reactors.edges;
            configRef.current.cursorEnd = data.data.node.reactors.page_info.end_cursor;
            configRef.current.isNextPage = data.data.node.reactors.page_info.has_next_page;
            if (!reactors || !reactors.length) {
              indexOption += 1;
              getUidInPost(apiUrl, postId, options[indexOption]);
              return;
            }
            reactors.forEach((reactor: any) => {
              const reactorId = reactor.node.id;
              const reactorName = reactor.node.name;
              setListMemberUid({ 'id': reactorId, 'name': reactorName });
            });
            updateState({ count: getQuantityMember() });

            if (configRef.current.isNextPage) {
              await getUidReactorsInPost(apiUrl, postId, configRef.current.cursorEnd);
            } else {
              indexOption += 1;
              getUidInPost(apiUrl, postId, options[indexOption]);
            }
          },
          'error': function () {
            stopSearchUid();
          }
        });
      }, 1500);
      return;
    }
    stopSearchUid();
  }

  const fetchUidPost = async (url: string, apiUrl: string) => {
    if (checkUidPost(url)) {
      await getUserID(url).then((response) => {
        if (response.status === 200) {
          postId = response.data;
          getUidInPost(apiUrl, response.data, options[indexOption], configRef.current.cursorEnd);
        } else {
          alert("Thao tác quá nhanh, vui lòng thử lại sau 5 giây");
          stopSearchUid();
        }
      });
    } else {
      postId = getIdUrl(url);
      getUidInPost(apiUrl, postId, options[indexOption], configRef.current.cursorEnd);
    }


  }

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
      case "post":
        if (additionalParam) {
          await getUidInPost("https://www.facebook.com/api/graphql", postId, options[indexOption], additionalParam);
        } else {
          await fetchUidPost(window.location.href, "https://www.facebook.com/api/graphql");
        }
        break;
    }
  };

  useEffect(() => {
    chrome.storage.local.get(["data"], async (storageData) => {
      if (storageData.data && storageData.data.active) {
        updateState({ isLayoutExportUid: true });

        options = storageData.data.options;

        configRef.current.type = storageData.data.type;
        index(storageData.data.type);
        removeCacheStorage();
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
            {state.success && <div className="text-green-500">Đã quét hết danh sách!</div>}

          </div>

          <div style={{ display: "flex", gap: "5px" }}>

            <ExportMemberToExcel data={state.arrUID} />
            <button
              type="button"
              onClick={() => exportToTXT(textAreaRef.current?.value || '', fileName)}
              className="h-10 bg-yellow-500 text-white px-4 rounded-md  text-sm"
            >
              Export TXT
            </button>
            <button onClick={() => copyToClipboard(textAreaRef.current?.value || '')} className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg'>
              Copy
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportUIDPage;
