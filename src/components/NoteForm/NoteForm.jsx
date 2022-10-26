import { PencilFill, TrashFill } from "react-bootstrap-icons";

import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { FieldError } from "components/FieldError/FieldError";
import { ValidatorService } from "./../../services/validator";
import s from "./style.module.css";
import { useState } from "react";

const VALIDATOR = {
  title: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
  },
  content: (value) => {
    return ValidatorService.min(value, 3);
  },
};
export function NoteForm({ title, onClickEdit, onClickDelete, onSubmit }) {
  const [formValues, setFormValues] = useState({ title: "", content: "" });
  const [formErrors, setFormErrors] = useState({ title: true, content: true });

  const updateFormValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
    validate(name, value);
  };

  const validate = (fieldName, fieldValue) => {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATOR[fieldName](fieldValue),
    });
  };

  const hasError = () => {
    for (const fieldName in formErrors) {
      if (formErrors[fieldName]) {
        return true;
      }
    }
    return false;
  };

  const actionIcons = (
    <>
      <div className="col-1">
        {onClickEdit && <PencilFill className={s.icon} />}
      </div>
      <div className="col-1">
        {onClickDelete && <TrashFill className={s.icon} />}
      </div>
    </>
  );
  const titleInput = (
    <div className="mb-5">
      <label className="form-label">Title</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="title"
        className="form-control"
      />
      <FieldError msg={formErrors.title} />
    </div>
  );
  const contentInput = (
    <div className="mb-5">
      <label className="form-label">Content</label>
      <textarea
        onChange={updateFormValues}
        type="text"
        name="content"
        className="form-control"
        row="5"
      />
      <FieldError msg={formErrors.content} />
    </div>
  );

  const submitBtn = (
    <div className={s.submit_btn}>
      <ButtonPrimary
        isDisabled={hasError()}
        onClick={() => onSubmit(formValues)}
      >
        Submit
      </ButtonPrimary>
    </div>
  );

  return (
    <div className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{title}</h2>
        </div>
        {actionIcons}
      </div>
      <div className={`mb-3 ${s.title_input_container}`}>{titleInput}</div>
      <div className="mb-3">{contentInput}</div>
      {onSubmit && submitBtn}
    </div>
  );
}
