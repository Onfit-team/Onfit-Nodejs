# scripts/hf_resume_download.py
import argparse, time, sys
from huggingface_hub import snapshot_download, HfHubHTTPError

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--repo", default="runwayml/stable-diffusion-inpainting")
    p.add_argument("--dir",  default="hf-cache/stable-diffusion-inpainting")
    p.add_argument("--workers", type=int, default=4)
    args = p.parse_args()

    # safetensors/설정/토크나이저만 받기 → 거대한 .bin / .ckpt 생략
    allow_patterns = ["**/*.json", "**/*.safetensors", "**/*.txt", "**/.gitattributes", "README.md", "model_index.json", "config.json"]
    ignore_patterns = ["*.bin", "*.ckpt"]

    tries = 0
    while True:
        tries += 1
        try:
            snapshot_download(
                repo_id=args.repo,
                local_dir=args.dir,
                resume_download=True,
                max_workers=args.workers,
                allow_patterns=allow_patterns,
                ignore_patterns=ignore_patterns,
                local_dir_use_symlinks=False,
            )
            print("✅ Download/Resume complete:", args.dir)
            return
        except HfHubHTTPError as e:
            print(f"⚠️ HfHubHTTPError: {e}. 재시도합니다 ({tries})...", file=sys.stderr)
        except Exception as e:
            print(f"⚠️ Error: {e}. 재시도합니다 ({tries})...", file=sys.stderr)

        if tries >= 10:
            print("❌ 10회 재시도 실패. 네트워크/디스크 상태 확인 필요.", file=sys.stderr)
            sys.exit(1)
        time.sleep(min(60, tries * 5))

if __name__ == "__main__":
    main()
