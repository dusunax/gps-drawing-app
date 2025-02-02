"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: {
      Link: {
        sendDefault: (options: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: {
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }[];
        }) => void;
      };
      isInitialized: () => boolean;
      init: (apiKey: string) => void;
    };
  }
}

interface KakaoShareButtonProps {
  title: string;
  imageUrl: string;
  className?: string;
}

export default function KakaoShareButton({
  title,
  imageUrl,
  className = "",
}: KakaoShareButtonProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY as string);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleKakaoShare = () => {
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "GPS Drawing Link",
          description: title,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: "그림 자세히 보기",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  return (
    <button
      onClick={handleKakaoShare}
      className={`flex items-center justify-center p-2 rounded-full bg-[#FEE500] hover:bg-[#FEE500]/90 transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6"
      >
        <path
          d="M16 4C8.268 4 2 9.04 2 15.36c0 4.155 2.786 7.785 6.96 9.801-.308 1.144-1.118 4.157-1.152 4.433-.036.343.127.338.267.246.11-.074 1.748-1.191 6.123-4.174a20.786 20.786 0 0 0 1.802.078c7.732 0 14-5.04 14-11.36S23.732 4 16 4z"
          fill="#000000"
        />
      </svg>
    </button>
  );
}
