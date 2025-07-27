// 옷장 필터 DTO
export class WardrobeFilterDto {
  constructor(query) {
    this.season = query.season ? Number(query.season) : undefined;
    this.color = query.color ? Number(query.color) : undefined;
    this.brand = query.brand || undefined;
    this.tagIds = query.tag_ids
      ? query.tag_ids.split(',').map((id) => Number(id.trim())).filter(Boolean)
      : undefined;
  }
}
