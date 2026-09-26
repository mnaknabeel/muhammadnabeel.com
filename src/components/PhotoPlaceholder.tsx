import { cn } from "@/lib/utils"
import { Camera } from "phosphor-react"

export default function PhotoPlaceholder({
  className,
  name,
}: {
  className?: string
  name?: string
}) {
  const imgPath = name ? `/images/${name}` : null

  if (imgPath) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-surface rounded-2xl border border-border",
          className,
        )}
      >
        <img
          src={imgPath}
          alt="Muhammad Nabeel"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none"
            const parent = (e.target as HTMLImageElement).parentElement
            if (parent) {
              parent.classList.add("flex", "items-center", "justify-center")
              parent.innerHTML = `<div class="text-center p-4"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 256 256"><path fill="#a1a1aa" d="M208 32H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16Zm-40 48a16 16 0 1 1-16 16 16 16 0 0 1 16-16Zm20 121.34-40-40-24 24L76 112l-24 24V48h160v140.8l-28.69-28.8a8 8 0 0 0-11.32 0l-16 16Z"/></svg><p class="text-muted text-xs mt-2">Add photo →<br>public/images/${name}</p><p class="text-muted text-[10px]">(add .jpg or .jpeg file)</p></div>`
            }
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-surface rounded-2xl border-2 border-dashed border-border",
        className,
      )}
    >
      <div className="text-center p-4">
        <Camera size={32} className="text-muted mx-auto mb-2" />
        <p className="text-muted text-xs">
          Upload photo →
          <br />
          <span className="font-mono">public/images/profile.jpg</span>
        </p>
      </div>
    </div>
  )
}
