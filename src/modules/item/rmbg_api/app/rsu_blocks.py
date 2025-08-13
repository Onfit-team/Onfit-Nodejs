import torch
import torch.nn as nn
import torch.nn.functional as F

class REBNCONV(nn.Module):
    def __init__(self, in_ch, out_ch, dirate=1):
        super(REBNCONV, self).__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1*dirate, dilation=1*dirate),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True)
        )

    def forward(self, x):
        return self.conv(x)

# ---------------------
# RSU-7
class RSU7(nn.Module):
    def __init__(self, in_ch, mid_ch, out_ch):
        super(RSU7, self).__init__()
        self.rebnconvin = REBNCONV(in_ch, out_ch)
        self.stage1 = REBNCONV(out_ch, mid_ch)
        self.pool1 = nn.MaxPool2d(2, stride=2, ceil_mode=True)

        self.stage2 = REBNCONV(mid_ch, mid_ch)
        self.pool2 = nn.MaxPool2d(2, stride=2, ceil_mode=True)

        self.stage3 = REBNCONV(mid_ch, mid_ch)
        self.pool3 = nn.MaxPool2d(2, stride=2, ceil_mode=True)

        self.stage4 = REBNCONV(mid_ch, mid_ch)
        self.pool4 = nn.MaxPool2d(2, stride=2, ceil_mode=True)

        self.stage5 = REBNCONV(mid_ch, mid_ch)
        self.pool5 = nn.MaxPool2d(2, stride=2, ceil_mode=True)

        self.stage6 = REBNCONV(mid_ch, mid_ch)
        self.pool6 = nn.MaxPool2d(2, stride=2, ceil_mode=True)

        self.stage7 = REBNCONV(mid_ch, mid_ch, dirate=2)

        self.stage6d = REBNCONV(mid_ch*2, mid_ch)
        self.stage5d = REBNCONV(mid_ch*2, mid_ch)
        self.stage4d = REBNCONV(mid_ch*2, mid_ch)
        self.stage3d = REBNCONV(mid_ch*2, mid_ch)
        self.stage2d = REBNCONV(mid_ch*2, mid_ch)
        self.stage1d = REBNCONV(mid_ch*2, out_ch)

        self.up = nn.Upsample(scale_factor=2, mode='bilinear', align_corners=True)

    def forward(self, x):
        hx = x
        hxin = self.rebnconvin(hx)

        hx1 = self.stage1(hxin)
        hx = self.pool1(hx1)

        hx2 = self.stage2(hx)
        hx = self.pool2(hx2)

        hx3 = self.stage3(hx)
        hx = self.pool3(hx3)

        hx4 = self.stage4(hx)
        hx = self.pool4(hx4)

        hx5 = self.stage5(hx)
        hx = self.pool5(hx5)

        hx6 = self.stage6(hx)
        hx = self.pool6(hx6)

        hx7 = self.stage7(hx)

        hx6d = self.stage6d(torch.cat((self.up(hx7), hx6), 1))
        hx5d = self.stage5d(torch.cat((self.up(hx6d), hx5), 1))
        hx4d = self.stage4d(torch.cat((self.up(hx5d), hx4), 1))
        hx3d = self.stage3d(torch.cat((self.up(hx4d), hx3), 1))
        hx2d = self.stage2d(torch.cat((self.up(hx3d), hx2), 1))
        hx1d = self.stage1d(torch.cat((self.up(hx2d), hx1), 1))

        return hx1d + hxin

# ---------------------
# RSU-6
class RSU6(RSU7):
    def __init__(self, in_ch, mid_ch, out_ch):
        super(RSU6, self).__init__(in_ch, mid_ch, out_ch)
        self.stage6 = REBNCONV(mid_ch, mid_ch)
        self.stage6d = REBNCONV(mid_ch*2, mid_ch)

# ---------------------
# RSU-5
class RSU5(RSU7):
    def __init__(self, in_ch, mid_ch, out_ch):
        super(RSU5, self).__init__(in_ch, mid_ch, out_ch)
        self.stage5 = REBNCONV(mid_ch, mid_ch)
        self.stage5d = REBNCONV(mid_ch*2, mid_ch)

# ---------------------
# RSU-4
class RSU4(RSU7):
    def __init__(self, in_ch, mid_ch, out_ch):
        super(RSU4, self).__init__(in_ch, mid_ch, out_ch)
        self.stage4 = REBNCONV(mid_ch, mid_ch)
        self.stage4d = REBNCONV(mid_ch*2, mid_ch)

# ---------------------
# RSU-4F (Flat, no downsampling)
class RSU4F(nn.Module):
    def __init__(self, in_ch, mid_ch, out_ch):
        super(RSU4F, self).__init__()
        self.rebnconvin = REBNCONV(in_ch, out_ch)
        self.stage1 = REBNCONV(out_ch, mid_ch)
        self.stage2 = REBNCONV(mid_ch, mid_ch, dirate=2)
        self.stage3 = REBNCONV(mid_ch, mid_ch, dirate=4)
        self.stage4 = REBNCONV(mid_ch, mid_ch, dirate=8)
        self.stage3d = REBNCONV(mid_ch*2, mid_ch, dirate=4)
        self.stage2d = REBNCONV(mid_ch*2, mid_ch, dirate=2)
        self.stage1d = REBNCONV(mid_ch*2, out_ch)

    def forward(self, x):
        hx = x
        hxin = self.rebnconvin(hx)
        hx1 = self.stage1(hxin)
        hx2 = self.stage2(hx1)
        hx3 = self.stage3(hx2)
        hx4 = self.stage4(hx3)
        hx3d = self.stage3d(torch.cat((hx4, hx3), 1))
        hx2d = self.stage2d(torch.cat((hx3d, hx2), 1))
        hx1d = self.stage1d(torch.cat((hx2d, hx1), 1))
        return hx1d + hxin
