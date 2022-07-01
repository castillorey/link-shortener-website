export interface BitlyResponse {
    references: {},
    link: string,
    id: string,
    long_url: string,
    archived: boolean,
    created_at: string,
    custom_bitlinks: [
      string
    ],
    tags: [
      string
    ],
    deeplinks: [
      {
        guid: string,
        bitlink: string,
        app_uri_path: string,
        install_url: string,
        app_guid: string,
        os: string,
        install_type: string,
        created: string,
        modified: string,
        brand_guid: string
      }
    ]
  
}