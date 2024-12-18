"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Terms() {
  const [showExtraTerms, setShowExtraTerms] = useState(false);

  return (
    <div className="text-[10px] mt-4 mb-10 text-gray-600 max-w-72 ">
      <div className="mb-5">
        <p>This page uses Google reCAPTCHA to verify you are not a robot.</p>
        <Button
          variant="ghost"
          onClick={() => setShowExtraTerms(!showExtraTerms)}
          className="text-center text-xs w-full mt-4 opacity-1 hover:text-zinc-200 text-red-500 hover:bg-transparent p-0 ml-1 h-fit"
        >
          More information
        </Button>
      </div>

      <div className="max-h-10">
        {showExtraTerms && (
          <p>
            The information collected by Google reCAPTCHA is subject to
            Google&apos;s Privacy Policy and Terms of Service, and is used to
            provide, maintain, and improve the reCAPTCHA service, as well as for
            general security purposes (Google does not use it for personalized
            advertising).
          </p>
        )}
      </div>
    </div>
  );
}
