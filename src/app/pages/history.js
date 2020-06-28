import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Small from "components/Typography/Small.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import typoStyles from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(styles);
const useTypoStyles = makeStyles(typoStyles);

export default function History(props) {
  const classes = useStyles();
  const typoClasses = useTypoStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={[]}
        brand="IEDPU - USA"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small image="img/central-mosque-1.jpg">
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem style={{ textAlign: "center" }} xs={12} sm={12} md={10}>
              <div>
                <h1 className={classes.title} style={{ color: "#fff" }}>
                  History
                </h1>
                <h2>
                  <Small>
                    <span style={{ color: "#fff" }}>
                      Learn more about the emirate with relevant historical
                      facts and timelines
                    </span>
                  </Small>
                </h2>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer style={{ textAlign: "center" }} justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <Typography
                  style={{ marginTop: "2rem" }}
                  variant="h4"
                  gutterBottom
                >
                  The Tradition of Storytelling
                </Typography>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} className={classes.marginLeft}>
                    <img
                      src="./img/history_1.jpeg"
                      alt="..."
                      className={`${classes.imgRaised} ${classes.imgRounded} ${classes.imgFluid}`}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  A highlight of Ilorin history will give you the drive to visit
                  the amazing country called Nigeria. A place filled with
                  exciting stories, myths and a rich cultural heritage which
                  even the youngest child can tell.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Itan, often worded in the Yoruba language means history,
                  knowledge passed down generations as a means of reviving the
                  connection to our indigenous identities. Stories such as the
                  outcome of battles and tales of courage, in ages, when people
                  could barely read or write live on in current-day carnivals
                  and festivals.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Although we no longer swap stories around the fireside,
                  storytelling traditions still continue in the form of urban
                  legends which remain popular today. In the city of Ilorin,
                  history provides a timeless link to ancient cultures, and that
                  is what brings villages together.
                </Typography>
                <Typography variant="h4" gutterBottom>
                  The Culture, Language and Practises in Ilorin
                </Typography>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} className={classes.marginLeft}>
                    <img
                      src="./img/history_2.jpeg"
                      alt="..."
                      className={`${classes.imgRaised} ${classes.imgRounded} ${classes.imgFluid}`}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Ilorin, the city capital of Kwara, lies in the West-Central
                  part of Nigeria, north of Ibadan and Ogbomoso, south of Jebba
                  and the river Niger. The town is the 7th largest city in
                  Nigeria with over 700,000 people from a variety of spoken
                  languages.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The city is a traditional emirate considered by some to be the
                  copy-cats of Hausa Kingdoms. It is certainly not uncommon to
                  hear people speak Yoruba in Kwara State. In fact, it is the
                  primary language spoken in Ilorin.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  When you mention a city with a confluence of cultures, Ilorin
                  stands out as one inhabited by the Yoruba, Igbo, Hausa,
                  Fulani, Nupe, Bariba and Kanuri tribes from across Nigeria and
                  beyond.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Although it remains a predominantly Muslim community, it is a
                  peaceful town which hosts different religious practices.
                  Upholding traditions is one thing natives abide by, as long as
                  it doesn’t contradict with the principles and teachings of
                  Islam.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The blend in a variety of ethnic groups, including the
                  original Fulani, Yoruba, Nupe and Hausa is strongly reflected
                  in the values, practises and languages they now commonly
                  speak.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Evidently, social activities and religious events such as
                  festivals, births, weddings and funerals observed in the city
                  are firmly rooted in the Islamic traditions.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Also, the Ilorin Yoruba has its dialects deeply influenced by
                  Arabic and northern languages, especially Hausa, Fulfulde and
                  Nupe. This has brought about peculiar Ilorin Yoruba words and
                  names like Emide (in short), Eeba (yes), Kau (Uncles), Kaa
                  (backyard), Magajiya (first daughter) and Daudu (first son).
                  What is, however, common among the Yorubas in Ilorin is the
                  way sentences end with ‘fa’.
                </Typography>
                <Typography variant="h4" gutterBottom>
                  Okuta Ilo-Irin, How the name of the city was formed
                </Typography>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} className={classes.marginLeft}>
                    <img
                      src="./img/history_3.jpeg"
                      alt="..."
                      className={`${classes.imgRaised} ${classes.imgRounded} ${classes.imgFluid}`}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The town has a long history stretching back to the legend of
                  Ojo Isekuse, a Yoruba hunter popularly regarded as a founding
                  father and settler in Ilorin.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  He was renowned for devising the method of sharpening metal
                  tools with stones. Historically, the name of the city “Ilorin”
                  was coined from Okuta Ilo-rin, meaning “stones used for
                  sharpening metal”. Thus, Ilorin was derived from the activity
                  done on the stone.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  It was said that the Ile-Ilorin compound used to be a place of
                  gathering for warriors and hunters, sharpening of knives and
                  weapons was done on stones.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The remains of Okuta Ilo-rin can be found in Ile-Ilorin
                  compound, Idiape area till date. The story behind the city
                  name is intriguing and has attracted a lot of inquisitive
                  tourists.
                </Typography>
                <br />
                <Typography variant="h4" gutterBottom>
                  The Fall of Old Oyo, Rise of Ilorin under Afonja and later the
                  Fulani Dynasty
                </Typography>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} className={classes.marginLeft}>
                    <img
                      src="./img/history_4.jpeg"
                      alt="..."
                      className={`${classes.imgRaised} ${classes.imgRounded} ${classes.imgFluid}`}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The city of Ilorin has its multiple ethnicities dating back to
                  the 18th Century, founded as a Yoruba town under Oyo-Ile (Old
                  Oyo empire).
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  It became the provincial military outpost under the
                  supervision of Afonja. At the time, Afonja was the
                  Aare-Ona-Kakanfo (generalissimo) and commander of the Oyo
                  army. He was answerable to the Alaafin and responsible for
                  carrying out military functions.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  While in disagreement with authority at the time, Afonja
                  plotted a revolt that prompted disunity that led to the
                  subsequent end of the Yoruba rule in Ilorin. He was aided in a
                  rebellion by Mallam Sheu Alimi (Fulani cleric from Sokoto),
                  Fulanis, Hausa warriors and slaves.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Afonja successfully vanquished his rivals, establishing a
                  trusting relationship and alliance with the Fulanis. Unknown
                  to Afonja, he was gradually being infiltrated by the Fulani
                  army, he lost control of his forces and was overthrown and
                  killed.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  After Afonja’s death, a Fulani dynasty was set up, and Ilorin
                  became an emirate within the Fulani Empire, under Gwandu.
                  Abdulsalami (Sheu Alimi’s son) took control of the city,
                  declared himself the Emir of Ilorin and pledged allegiance to
                  the Sokoto Caliphate.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  And this was how the monarch of Ilorin held the title of Emir
                  till today.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The 1900s witnessed the incorporation of Ilorin into the
                  British colony of Northern Nigeria. It strongly resisted
                  British rule, and not until 1897, when the army of the Royal
                  Niger Company arrived after conquering Bida, did Ilorin
                  recognize British supremacy. Although, the emirate has since
                  retained its strong Islamic influence and continues to perform
                  ceremonial functions.
                </Typography>
                <br />
                <Typography variant="h4" gutterBottom>
                  District Representatives in Ilorin
                </Typography>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} className={classes.marginLeft}>
                    <img
                      src="./img/history_5.jpeg"
                      alt="..."
                      className={`${classes.imgRaised} ${classes.imgRounded} ${classes.imgFluid}`}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Owing to Ilorin’s unique history, first as a Yoruba military
                  outpost of Oyo-Ile, then as a Fulani vassal state of Sokoto
                  Caliphate. The city has since evolved into districts
                  administered by representatives from all tribes.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Balogun Gambari (Hausa), the Balogun Ajikobi (Yoruba), the
                  Balogun Fulani (Fulani) and the Balogun Alanamu (Yoruba),
                  along with the head of the Afonja chieftaincy family, the
                  Mogaji Aare, and his sub-chief called the Baba Isale of
                  Ilorin.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The longest-reigning of the four Baloguns is conferred with
                  the Balogun Agba title, making him the second in command to
                  the Emir of Ilorin.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Although the throne is vested in the Fulani descendants of
                  Shehu Alimi, district heads all come together to elect a new
                  emir, subject to the approval of the Governor of Kwara State.
                </Typography>
                <br />
                <Typography variant="h4" gutterBottom>
                  Prominent Indigenous Industries in Ilorin in the 19th Century
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  In the nineteenth Century, Ilorin was a famous trading centre
                  known for its industrial production. Especially lantana stone
                  beads, high-quality narrow-loom cloth and various types of
                  pots.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The centre of the pottery industry and lantana bead making is
                  in Okelele, and the primary Ilorin pot market is in Idiape.
                  Not only are the pottery and bead making industries centred in
                  the same area, but they are also now virtually extinct. This
                  has been reported to be as a result of social constraints on
                  skills transmission.
                </Typography>
                <br />
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} className={classes.marginLeft}>
                    <img
                      src="./img/history_6.jpeg"
                      alt="..."
                      className={`${classes.imgRaised} ${classes.imgRounded} ${classes.imgFluid}`}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  <strong>Pottery production</strong> is derived originally from
                  Old Oyo. It was mostly carried out by the Yoruba women in
                  Ilorin, centred mainly in Okelele district, the northwestern
                  area of the city.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The pottery wares were made in red (Pupa) and black (Dudu).
                  The red products are from sandy local clay colours decorated
                  in reddish slips. It came in large vessels (Amu and Koko),
                  used mostly for water storage.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  In most cases, Amu, which was useful for cooling, was gifted
                  to young brides. Awo (plates) and Koko (food pots) are still
                  used to date.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The black products were made into pots with burnished designs
                  (Isasun and Agbada). It came in various sizes used in the
                  storage of medicines and oils (Oru, Konjo).
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  <strong>Lantana Bead making</strong> was among the most
                  prominent trades in the 1900s. The red stone beads were called
                  lantana by the Hausas who brought the raw material to the
                  town. The stones were quarried and brought down to Ilorin by
                  Hausa traders in exchange for clothing.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  The beads are highly polished and reddish-brown in colour,
                  quarried from jasper or chalcedony. It was made into
                  fashionable pendants and necklaces of varied shades, shapes
                  and sizes.
                </Typography>
                <br />
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} className={classes.marginLeft}>
                    <img
                      src="./img/history_7.jpeg"
                      alt="..."
                      className={`${classes.imgRaised} ${classes.imgRounded} ${classes.imgFluid}`}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  <strong>Narrow looms (Alaari and Sanyan)</strong> are notable
                  among the most luxurious industries in Ilorin in the 1900s,
                  produced mainly by male weavers. Finished products of
                  narrow-loom clothing are of various types and styles,
                  including Alaari (magenta silk), dark red in colour. Sanyan or
                  West African wild silk is natural light brown silk with a
                  narrow white stripe commonly worn during occasions.
                </Typography>
                <br />
                <Typography variant="h4" gutterBottom>
                  ILORIN DURBAR
                </Typography>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} className={classes.marginLeft}>
                    <img
                      src="./img/history_8.jpeg"
                      alt="..."
                      className={`${classes.imgRaised} ${classes.imgRounded} ${classes.imgFluid}`}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Ilorin Durbar is one festival you do not want to miss. It is
                  held annually on the second day of Eid ul Fitr (Muslim
                  festival). Nobles, chieftains and dignitaries across the
                  Ilorin Emirate often mount the horseback in full traditional
                  and royal regalia.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  One pretty exciting feature of the ceremony is that it is
                  linked to the precolonial aspect of the martial display.
                  Natives are all uniquely dressed in colourful attires,
                  distinguishing clans within the Ilorin Emirate.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Here, natives pay homage with a resounding “Sheu” slogan to
                  the reigning Emir and nobles during the parade. It is a rare
                  opportunity for people to see the highly revered monarch in
                  public.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  It commences with the procession of the Emir on a heavily
                  decorated horse, escorted by his entourage on horses and
                  camels, accompanied by Kakaki performers and entertainers. It
                  begins and ends at the Emir’s palace.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Durbar festivals are considered tourist attractions celebrated
                  in many cities in Northern Nigeria.
                </Typography>
                <br />
                <Typography variant="h4" gutterBottom>
                  ILORIN WEDDING FESTIVITY
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Wedding festivity in Ilorin is an occasion people look forward
                  to. Commemorating the joining together of families is a
                  prominent custom in Ilorin.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  It is full of bright colours, toe-tapping music, and
                  traditions that span seven days. These celebrations tell a
                  unique story of past traditions of descendants which is why
                  marriage celebrations are essential to natives.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  If you want to attend a wedding that is entertainment focused,
                  informal and all about fun, food and culture then Ilorin
                  weddings are perfect for you.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Couples dress elegantly in traditional attires such as Sanyan
                  (West African wild silk), sewn in unique styles. Sanyan and
                  Iyun (red lantana beads) are precious family heirlooms passed
                  on from parents to their children and worn with pride at major
                  celebrations like weddings.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  When it comes to Ilorin Fulani weddings, it kicks off with
                  Sisa which literally means “to run away”. It is the
                  traditional migration of the bride or groom from their family
                  home to a relative’s house, either paternal or maternal
                  relations.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  Friends and families keep their company and escort them back
                  in the evenings, often parading and dancing to music and
                  drums. It is a way of celebrating the bride and groom for
                  making the family proud.
                </Typography>
                <br />
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} className={classes.marginLeft}>
                    <img
                      src="./img/history_9.jpeg"
                      alt="..."
                      className={`${classes.imgRaised} ${classes.imgRounded} ${classes.imgFluid}`}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  <strong>Henna Day,</strong> Laali is a form of adornment that
                  distinguishes the bride. It has become an event of
                  beautification for the bride’s families and her bridesmaids,
                  giving marital advice to the bride as they sing joyfully.
                  Laali is a flowery tattoo usually in orange and black colours,
                  decorated on arms and feets.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  <strong>Ijo Olomoba</strong> is distinctly observed by the
                  sons and daughters of the royal family in Ilorin, especially
                  during their weddings. They sing and dance in rhythms to a
                  beating calabash placed in a wet mortar. Specifically, royals
                  and Fulani families in Ilorin are accustomed to tying a brass
                  bracelet on the bride’s feet and hands, days after the
                  wedding.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  <strong>Are-Osan</strong> meaning “afternoon party”, is
                  peculiar to all Ilorin weddings. Guests are dressed elegantly
                  in a colourful Ankara attire. Drummers, and wives from their
                  distinct households sing in the chorus as they escort the
                  bride and groom to welcome guests.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  <strong>Aisun</strong> takes place on the wedding eve.
                  Traditional music (waka) is played all night for the
                  entertainment of guests of both the bride and groom.
                </Typography>
                <br />
                <GridContainer justify="center">
                  <GridItem xs={12} sm={8} className={classes.marginLeft}>
                    <img
                      src="./img/history_10.jpeg"
                      alt="..."
                      className={`${classes.imgRaised} ${classes.imgRounded} ${classes.imgFluid}`}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  <strong>Yigi (Walimat Nikkah)</strong> is the solemnization
                  and engagement of couples by an Islamic cleric. It is done
                  with the approval of the couple, parents or guardians.
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  style={{ textAlign: "justify" }}
                  gutterBottom
                >
                  <strong>Ilu Kengbe</strong> involves processional dances by
                  the bride’s relatives to the groom’s family home. It is the
                  way of expressing joy and unity of the families merging by the
                  marriage of their wards.
                </Typography>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
