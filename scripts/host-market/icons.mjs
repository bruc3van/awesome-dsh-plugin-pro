/** Keep package artwork in format-1 JSON, including icons above the inline limit. */
import sharp from 'sharp'
import { createHash } from 'node:crypto'

/** Raster data URLs the vendor metadata reader inlines verbatim when small: PNG/JPEG only (SVG stays vector, WebP is already efficient). */
const RASTER_DATA_ICON = /^data:image\/(png|jpe?g);base64,(.+)$/u

// One small static frame is enough for the host's 36px artwork slot.
async function optimize(input) {
  const output = await sharp(input, { limitInputPixels: 16 * 1024 * 1024, pages: 1 })
    .resize(96, 96, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, effort: 4 })
    .toBuffer()
  if (output.length > 32768) throw Error('optimized icon exceeds 32 KiB')
  return output
}

export async function inlineIcon(display, iconFile, report) {
  if (iconFile) {
    try {
      const input = Buffer.from(iconFile.bytes)
      const output = await optimize(input)
      display.icon = `data:image/webp;base64,${output.toString('base64')}`
      report({ code: 'icon_optimized', status: 'info', reason: '包内原始图标压缩为不超过 96px 的 WebP 后内联',
        inputSha256: createHash('sha256').update(input).digest('hex'),
        outputSha256: createHash('sha256').update(output).digest('hex'),
        inputBytes: input.length, outputBytes: output.length })
    } catch (error) {
      delete display.icon
      report({ code: 'metadata_warning', status: 'warning', reason: `图标压缩失败，已省略：${error.message}` })
    }
    return
  }
  // Icons at or below the vendor inline threshold are embedded verbatim in their original format;
  // re-encode raster ones so small PNG/JPEG artwork cannot bypass optimization.
  const embedded = typeof display.icon === 'string' ? RASTER_DATA_ICON.exec(display.icon) : null
  if (!embedded) return
  try {
    const input = Buffer.from(embedded[2], 'base64')
    const output = await optimize(input)
    if (output.length >= input.length) return
    display.icon = `data:image/webp;base64,${output.toString('base64')}`
    report({ code: 'icon_optimized', status: 'info', reason: '内嵌 PNG/JPEG 图标重编码为不超过 96px 的 WebP',
      inputSha256: createHash('sha256').update(input).digest('hex'),
      outputSha256: createHash('sha256').update(output).digest('hex'),
      inputBytes: input.length, outputBytes: output.length })
  } catch (error) {
    delete display.icon
    report({ code: 'metadata_warning', status: 'warning', reason: `图标重编码失败，已省略：${error.message}` })
  }
}
