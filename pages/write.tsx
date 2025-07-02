import ErrorBoundary from "../components/ErrorBoundary";
import User from "../models/user";
import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { Note, Button, Input, Textarea } from "@geist-ui/core";
import { NextPageContext } from "next";
import jwt from "jsonwebtoken";
import { Save, Eye, Edit3 } from "react-feather";

export default function () {
  const [input, setInput] = useState<string>("");
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [title, setTitle] = useState<string>("");
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        if (input !== "") window.localStorage.setItem("note", input);
        setMdxSource(await serialize(input));
        setError(undefined);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [input]);

  useEffect(() => {
    setInput(window.localStorage.getItem("note") || "");
  }, []);

  const handleSave = async () => {
    if (!title.trim()) {
      setError("請輸入文章標題");
      return;
    }
    if (!input.trim()) {
      setError("請輸入文章內容");
      return;
    }

    setIsSaving(true);
    setError(undefined);
    setSuccess(undefined);

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: input.trim(),
          coverImageUrl: coverImageUrl.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`文章保存成功！Slug: ${data.slug}`);
        // 清除 localStorage
        window.localStorage.removeItem("note");
        setInput("");
        setTitle("");
        setCoverImageUrl("");
      } else {
        setError(data.error || "保存失敗");
      }
    } catch (err) {
      setError("網絡錯誤，請稍後再試");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-screen grid grid-cols-5">
      <div className="col-span-2">
        <div className="fixed top-0 left-0 w-[40vw] h-full bg-zinc-100 z-20 flex flex-col">
          {/* 保存按鈕和表單 */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">寫作編輯器</h2>
              <div className="flex gap-2">
                <Button
                  scale={1 / 2}
                  icon={<Edit3 size={16} />}
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? "隱藏" : "設置"}
                </Button>
                <Button
                  type="success"
                  scale={1 / 2}
                  icon={<Save size={16} />}
                  loading={isSaving}
                  onClick={handleSave}
                >
                  保存文章
                </Button>
              </div>
            </div>

            {showForm && (
              <div className="space-y-3">
                <Input
                  label="文章標題"
                  placeholder="輸入文章標題..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  width="100%"
                />
                <Input
                  label="封面圖片 URL"
                  placeholder="可選：輸入封面圖片 URL"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  width="100%"
                />
              </div>
            )}
          </div>

          {/* 編輯器 */}
          <div className="flex-1 p-4">
            <textarea
              spellCheck={false}
              className="w-full h-full p-4 outline-none resize-none bg-transparent"
              placeholder="開始寫作你的 MDX 文章..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3 z-30">
        <div
          className="w-full lg:h-[46rem] h-[36rem] overflow-hidden
         relative flex justify-center"
        >
          <img
            src={
              coverImageUrl ||
              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop"
            }
            className="absolute top-0 w-full h-full object-cover bg-zinc-500"
            alt=""
          />
          <div
            className="w-full h-full absolute top-0 right-0
         bg-black bg-opacity-60"
          />
          <div
            className="w-full px-4
         lg:w-[650px] mx-auto absolute lg:bottom-24 bottom-12"
          >
            <p
              className="text-white text-3xl lg:text-5xl font-extrabold"
              style={{ lineHeight: 1.5 }}
            >
              {title || "文章標題"}
            </p>

            <div className="flex flex-row align-bottom mt-4">
              <img
                src="https://lh3.googleusercontent.com/a/ACg8ocLrYjvD01l_M0ZX5DWrnQD-5g36lsVf3upMBetPWTd8jzgvfQmg=s96-c"
                className="rounded-full h-8 w-8 mr-4"
                alt=""
              />
              <p
                className="text-white lg:text-xl
             font-extrabold opacity-80"
              >
                Derrick Liu 劉穎多
              </p>
              <p className="text-white lg:text-xl ml-2 lg:ml-8 opacity-60">
                {new Date().toISOString().split("T")[0]}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[650px] px-4 mx-auto min-h-screen">
          {error && <Note type="error">{error}</Note>}
          {success && <Note type="success">{success}</Note>}
          <div id="article" className="mt-16 mb-32">
            {mdxSource && (
              <ErrorBoundary>
                <MDXRemote {...mdxSource} />
              </ErrorBoundary>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
