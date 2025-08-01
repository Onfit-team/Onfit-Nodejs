from transformers import PretrainedConfig

class RMBGConfig(PretrainedConfig):
    model_type = "bria_rmbg"

    def __init__(self, in_ch=3, out_ch=1, **kwargs):
        super().__init__(**kwargs)
        self.in_ch = in_ch
        self.out_ch = out_ch
