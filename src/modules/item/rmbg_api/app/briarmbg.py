import torch
import torch.nn as nn
from app.rsu_blocks import RSU7, RSU6, RSU5, RSU4, RSU4F

class BriaRMBG(nn.Module):
    def __init__(self, in_ch=3, out_ch=1):
        super(BriaRMBG, self).__init__()
        self.stage1 = RSU7(in_ch, 32, 64)
        self.pool1 = nn.MaxPool2d(2, stride=2, ceil_mode=True)
        self.stage2 = RSU6(64, 32, 128)
        self.pool2 = nn.MaxPool2d(2, stride=2, ceil_mode=True)
        self.stage3 = RSU5(128, 64, 256)
        self.pool3 = nn.MaxPool2d(2, stride=2, ceil_mode=True)
        self.stage4 = RSU4(256, 128, 512)
        self.pool4 = nn.MaxPool2d(2, stride=2, ceil_mode=True)
        self.stage5 = RSU4F(512, 256, 512)

        self.stage6 = RSU4F(512, 256, 512)

        self.stage5d = RSU4F(1024, 256, 512)
        self.stage4d = RSU4(1024, 128, 256)
        self.stage3d = RSU5(512, 64, 128)
        self.stage2d = RSU6(256, 32, 64)
        self.stage1d = RSU7(128, 16, 64)

        self.output = nn.Conv2d(64, out_ch, 1)

    def forward(self, x):
        x1 = self.stage1(x)
        x2 = self.stage2(self.pool1(x1))
        x3 = self.stage3(self.pool2(x2))
        x4 = self.stage4(self.pool3(x3))
        x5 = self.stage5(self.pool4(x4))
        x6 = self.stage6(self.pool4(x5))

        x5d = self.stage5d(torch.cat((x6, x5), 1))
        x4d = self.stage4d(torch.cat((x5d, x4), 1))
        x3d = self.stage3d(torch.cat((x4d, x3), 1))
        x2d = self.stage2d(torch.cat((x3d, x2), 1))
        x1d = self.stage1d(torch.cat((x2d, x1), 1))

        return {"pha": torch.sigmoid(self.output(x1d))}
