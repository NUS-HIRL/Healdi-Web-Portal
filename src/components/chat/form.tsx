"use client"

import { useRef } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import MessageInput, { MessageInputRef } from "./message-input"

const Form = () => {
  const messageInputRef = useRef<MessageInputRef>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<FieldValues>({
    defaultValues: { message: "" }
  })

  const watchedMessage = watch("message")

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    setValue("message", "", { shouldValidate: true })
    messageInputRef.current?.resetTextareaHeight()
  }

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full max-h-32">
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type something..."
          onEnterPress={handleSubmit(onSubmit)}
          watchedMessage={watchedMessage}
          ref={messageInputRef}
        />
      </form>
    </div>
  )
}

export default Form
