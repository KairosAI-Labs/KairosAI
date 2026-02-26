import { Mail, User, MessageCircleMore } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { inputUserData } from "@/schema/scheduleMeetingData";

interface MeetingFormProps {
  inputData: inputUserData;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
}

export function MeetingForm({ inputData, onChange, disabled }: MeetingFormProps) {
  return (
    <div className="space-y-[20px]">
      {/* Input correo */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email-input"
          className="text-sm text-white/70 font-medium flex items-center gap-1.5"
        >
          <Mail size={14} aria-hidden="true" />
          Correo electrónico
        </Label>
        <Input
          id="email-input"
          type="email"
          value={inputData.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="tu@correo.com"
          autoComplete="email"
          disabled={disabled}
          className="
            w-full h-11 rounded-xl px-4
            bg-white/5 border border-white/10
            text-white text-sm placeholder:text-white/30
            outline-none focus:border-[#8656ec]/60 focus:ring-1 focus:ring-[#8656ec]/40
            transition-colors duration-200
            disabled:opacity-50
          "
        />
      </div>

      {/* Input nombre */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="name-input"
          className="text-sm text-white/70 font-medium flex items-center gap-1.5"
        >
          <User size={14} aria-hidden="true"/>
          Nombre
        </Label>
        <Input
          id="name-input"
          type="text"
          value={inputData.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Tu Nombre"
          autoComplete="name"
          disabled={disabled}
          className="
            w-full h-11 rounded-xl px-4
            bg-white/5 border border-white/10
            text-white text-sm placeholder:text-white/30
            outline-none focus:border-[#8656ec]/60 focus:ring-1 focus:ring-[#8656ec]/40
            transition-colors duration-200
            disabled:opacity-50
          "
        />
      </div>

      {/* Input asunto */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="summary-input"
          className="text-sm text-white/70 font-medium flex items-center gap-1.5"
        >
          <MessageCircleMore size={14} aria-hidden="true"/>
          Asunto
        </Label>
        <Textarea 
          id="summary-input"
          name="summary"
          placeholder=""
          value={inputData.summary}
          onChange={(e) => onChange("summary", e.target.value)}
          disabled={disabled}
          className="
            min-h-[100px] rounded-xl px-4
            bg-white/5 border border-white/10
            text-white text-sm placeholder:text-white/30
            outline-none focus:border-[#8656ec]/60 focus:ring-1 focus:ring-[#8656ec]/40
            transition-colors duration-200 resize-none 
            disabled:opacity-50
          "
        />
      </div>
    </div>
  );
}
