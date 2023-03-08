import Diary from "../Diary";
import React, {useState} from "react";
import PopupModal from "../Modal/PopupModal";
import FormInput from "../FormInput/FormInput";

const DiaryTable = ({diaries}) => {

  const [diaryInfoModal, setDiaryInfoModal] = useState(false)

    return (
      <>
        <div className="sections-list">
          {diaries.length && (
              diaries.map((diary) => (
                <Diary showDiaryInfoModal={() => setDiaryInfoModal(diary)} key={diary.id} diary={diary}  />
              ))
          )}
          {!diaries.length && (
              <p>No data</p>
          )}
        </div>
        {diaryInfoModal && <PopupModal
						modalTitle={"Diary Info"}
						onCloseBtnPress={() => {
							setDiaryInfoModal(false);
						}}
					>
						<div className="mt-4 text-left">
							<form className="mt-5">
								<FormInput
									disabled
									type={"text"}
									name={"label"}
									label={"Label"}
									value={diaryInfoModal?.label}
								/>
								<FormInput
									disabled
									type={"text"}
									name={"url"}
									label={"Url"}
									value={diaryInfoModal?.url}
								/>
								<FormInput
									disabled
									type={"text"}
									name={"source"}
									label={"Source"}
									value={diaryInfoModal?.source}
								/>
							</form>
						</div>
					</PopupModal>}
      </>
    )
}

export default DiaryTable;