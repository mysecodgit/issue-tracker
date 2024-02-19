"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue)
        await axios.patch("http://localhost:3000/api/issues/" + issue.id, data);
      else await axios.post("http://localhost:3000/api/issues", data);

      router.push("/issues/list");
      router.refresh();
    } catch (err) {
      setError("un-expected error happened");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-4" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit}>
        <div className="space-y-3">
          <TextField.Root>
            <TextField.Input
              defaultValue={issue?.title}
              placeholder="Enter title"
              {...register("title")}
            />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Enter description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <Button disabled={isSubmitting} className="!cursor-pointer">
          {issue ? "update issue" : "create issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
