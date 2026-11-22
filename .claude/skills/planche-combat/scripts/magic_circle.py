import math
from PIL import Image
# Azure casting circle, pixel art, drawn on a 64x64 cell under the feet (anchor 32,52)
DARK=(26,96,196,255); MID=(56,160,255,255); LIGHT=(150,220,255,255); CORE=(235,250,255,255)
def ring(px, cx, cy, rx, ry, col, step=0.01, alpha=255):
    seen=set(); t=0.0
    while t < 2*math.pi:
        x=round(cx+rx*math.cos(t)); y=round(cy+ry*math.sin(t))
        if (x,y) not in seen and 0<=x<64 and 0<=y<64:
            seen.add((x,y)); px[x,y]=col[:3]+(alpha,)
        t+=step
def circle_frame(i, n, cx=32, cy=52):
    im=Image.new("RGBA",(64,64)); px=im.load()
    pulse = 0.5+0.5*math.cos(2*math.pi*i/n)
    # soft fill (faint) inside the outer ellipse
    for y in range(64):
        for x in range(64):
            d=((x-cx)/22)**2+((y-cy)/8)**2
            if d<1: px[x,y]=(56,160,255,int(40+30*pulse))
    ring(px,cx,cy,22,8,DARK)
    ring(px,cx,cy,21,7,LIGHT if pulse>0.5 else MID)
    ring(px,cx,cy,14,5,MID)
    # runes: 8 marks turning around the band between the rings
    for k in range(8):
        a=2*math.pi*(k/8+i/(n*8))
        x=round(cx+17.5*math.cos(a)); y=round(cy+6*math.sin(a))
        px[x,y]=CORE
        px[x+1 if x<63 else x,y]=LIGHT
    # inner star: a diamond that blinks
    for dx,dy in ((0,-2),(0,2),(-4,0),(4,0)):
        px[cx+dx,cy+dy]=LIGHT if pulse>0.3 else MID
    px[cx,cy]=CORE
    return im
