"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Clue {
  clue_id: string
  name: string
  description: string
}

interface Dialogue {
  character: string
  speech: string
}

interface Option {
  option_id: string
  description: string
  next_scene: string
  required_clues?: string[]
}

interface Scene {
  scene_id: string
  narration: string
  dialogues: Dialogue[]
  background_audio: string
  clues: Clue[]
  options: Option[]
}

const mockStoryData: Scene[] = [
  {
    scene_id: "scene_1",
    narration:
      "The gaslight flickers against the grimy windows of Threadneedle Street as Inspector Edmund Blackthorne arrives at the scene of what promises to be one of London's most perplexing murders. The fog rolls thick through the narrow Victorian streets, muffling the clip-clop of horse hooves and the distant cry of newspaper vendors announcing the shocking death of prominent banker Reginald Ashworth. Inside the opulent offices of Ashworth & Associates, the mahogany-paneled walls seem to whisper secrets of financial dealings and hidden grudges. The victim lies slumped over his leather-bound ledger, a crystal paperweight stained with blood beside his head, while the scent of expensive tobacco and fear hangs heavy in the air. As Blackthorne surveys the scene, he knows that in the labyrinthine world of Victorian banking, where fortunes are made and lost on a handshake, every suspect harbors secrets that could provide motive for murder. The inspector's keen eyes take in every detail, from the scattered papers on the Persian rug to the half-empty brandy decanter, understanding that in this world of propriety and hidden vice, appearances can be fatally deceiving.",
    dialogues: [
      {
        character: "Inspector Blackthorne",
        speech:
          "Another tragedy in the heart of London's financial district. The fog may obscure the streets, but it won't hide the truth.",
      },
      {
        character: "Constable Williams",
        speech:
          "The body was discovered this morning by his secretary, Miss Charlotte Pemberton. She's quite shaken, sir.",
      },
      {
        character: "Inspector Blackthorne",
        speech:
          "Indeed. In my experience, those closest to the victim often hold the keys to understanding their demise.",
      },
    ],
    background_audio: "Victorian street ambiance with horse carriages",
    clues: [
      {
        clue_id: "crime_scene",
        name: "Crime Scene Layout",
        description: "Reginald Ashworth found dead at his desk, crystal paperweight nearby with blood",
      },
    ],
    options: [
      {
        option_id: "examine_desk",
        description: "Examine the victim's desk more closely",
        next_scene: "scene_2",
      },
      {
        option_id: "interview_secretary",
        description: "Interview the secretary who found the body",
        next_scene: "scene_3",
      },
      {
        option_id: "inspect_office",
        description: "Inspect the office for signs of struggle",
        next_scene: "scene_4",
      },
    ],
  },
  {
    scene_id: "scene_2",
    narration:
      "Inspector Blackthorne approaches the imposing mahogany desk where Reginald Ashworth met his untimely end, the gaslight casting dancing shadows across the leather-bound ledgers and scattered correspondence. The banker's final moments are frozen in time - his fountain pen still clutched in his right hand, ink blotting the page where he had been writing what appears to be a letter of significant importance. Among the papers, Blackthorne discovers a half-written note that begins 'My dearest Margaret, I fear I have made a terrible mistake...' before trailing off in an illegible scrawl. The crystal paperweight, now evidence of the fatal blow, bears the engraved initials 'R.A.' and shows traces of what appears to be hair and blood on its sharp corner. Most intriguingly, the inspector notices that the victim's gold pocket watch has stopped at precisely 9:47, though whether this indicates the time of death or merely coincidence remains to be determined. The desk drawers, when examined, reveal a locked compartment that seems to have been recently tampered with, its brass lock showing fresh scratches that suggest someone was desperately searching for something of great value.",
    dialogues: [
      {
        character: "Inspector Blackthorne",
        speech:
          "Curious. This letter to Margaret - presumably his wife - suggests he was troubled by something significant.",
      },
      {
        character: "Constable Williams",
        speech: "The paperweight appears to be the murder weapon, sir. Quite a brutal way to end a man's life.",
      },
      {
        character: "Inspector Blackthorne",
        speech: "Indeed, but notice the positioning. Was this a crime of passion, or something more calculated?",
      },
    ],
    background_audio: "Ticking clock and rustling papers",
    clues: [
      {
        clue_id: "unfinished_letter",
        name: "Unfinished Letter",
        description: "Half-written letter to Margaret mentioning a 'terrible mistake'",
      },
      {
        clue_id: "stopped_watch",
        name: "Stopped Pocket Watch",
        description: "Victim's gold watch stopped at 9:47",
      },
      {
        clue_id: "tampered_lock",
        name: "Tampered Desk Lock",
        description: "Fresh scratches on locked drawer suggest recent break-in attempt",
      },
    ],
    options: [
      {
        option_id: "open_drawer",
        description: "Try to open the locked drawer",
        next_scene: "scene_5",
      },
      {
        option_id: "examine_letter",
        description: "Examine the unfinished letter more closely",
        next_scene: "scene_6",
      },
      {
        option_id: "question_wife",
        description: "Question the wife Margaret about the letter",
        next_scene: "scene_7",
      },
    ],
  },
  {
    scene_id: "scene_3",
    narration:
      "Miss Charlotte Pemberton sits in the waiting area outside the banker's office, her usually pristine appearance disheveled and her hands trembling as she clutches a lace handkerchief stained with tears. The young secretary, no more than twenty-five years of age, possesses the kind of refined beauty that would not go unnoticed in the male-dominated world of Victorian banking, her auburn hair partially escaped from its pins and her green eyes red-rimmed from crying. As Inspector Blackthorne approaches, he notes the way she flinches at his presence, her nervous energy suggesting either genuine grief or carefully concealed guilt. Her black mourning dress, hastily donned, bears a small tear at the sleeve that she attempts to hide, and the inspector observes that her usually immaculate penmanship, evident in the appointment book beside her, has become shaky and erratic in today's entries. When she speaks, her voice carries the educated accent of someone who has risen above her station through intelligence and determination, yet there's an underlying tension that suggests she harbors secrets about her relationship with the deceased banker. The way she avoids direct eye contact while recounting the discovery of the body raises questions about whether Miss Pemberton's role in Ashworth's life extended beyond mere professional duties.",
    dialogues: [
      {
        character: "Miss Pemberton",
        speech:
          "I... I arrived at my usual time, eight o'clock sharp. Mr. Ashworth was always here before me, but when I knocked, there was no answer.",
      },
      {
        character: "Inspector Blackthorne",
        speech: "And what did you do then, Miss Pemberton?",
      },
      {
        character: "Miss Pemberton",
        speech: "I used my key to enter. That's when I found him... oh, it was horrible! There was so much blood!",
      },
      {
        character: "Inspector Blackthorne",
        speech: "You seem quite distressed. Was your relationship with Mr. Ashworth purely professional?",
      },
    ],
    background_audio: "Soft sobbing and distant street sounds",
    clues: [
      {
        clue_id: "secretary_key",
        name: "Secretary's Key",
        description: "Charlotte had a key to Ashworth's private office",
      },
      {
        clue_id: "torn_dress",
        name: "Torn Sleeve",
        description: "Charlotte's dress has a fresh tear she tries to hide",
      },
      {
        clue_id: "nervous_behavior",
        name: "Nervous Demeanor",
        description: "Charlotte shows signs of extreme anxiety beyond normal grief",
      },
    ],
    options: [
      {
        option_id: "press_relationship",
        description: "Press her about the nature of her relationship with Ashworth",
        next_scene: "scene_8",
      },
      {
        option_id: "ask_whereabouts",
        description: "Ask about her whereabouts last evening",
        next_scene: "scene_9",
      },
      {
        option_id: "inquire_behavior",
        description: "Inquire about any recent changes in Ashworth's behavior",
        next_scene: "scene_10",
      },
    ],
  },
  {
    scene_id: "scene_4",
    narration:
      "The inspector's trained eye sweeps across the opulent office, searching for signs of the violent struggle that must have preceded Reginald Ashworth's death, yet the scene presents a puzzling contradiction to expectations of a brutal murder. The Persian rug beneath the desk shows no signs of being disturbed, its intricate patterns lying flat and undisturbed except for a few scattered papers that appear to have fallen from the desk during the fatal blow. The heavy velvet curtains hang perfectly straight, their gold tassels untouched, while the collection of leather-bound books on the mahogany shelves remain in perfect order, suggesting that if there was a confrontation, it was brief and decisive. However, upon closer inspection, Blackthorne notices something peculiar: a single crystal glass lies shattered near the fireplace, its fragments catching the gaslight like tiny diamonds scattered across the dark wood floor. The fireplace itself contains the cold ashes of what appears to have been recently burned papers, their charred edges still visible among the soot, indicating that someone took great care to destroy evidence before or after the murder. Most intriguingly, the office door shows no signs of forced entry, and the window remains securely latched from the inside, suggesting that the killer was either someone Ashworth trusted enough to admit willingly, or someone who possessed their own means of access to this inner sanctum of London's financial elite.",
    dialogues: [
      {
        character: "Inspector Blackthorne",
        speech: "Curious. For such a violent crime, there are remarkably few signs of struggle.",
      },
      {
        character: "Constable Williams",
        speech: "Perhaps the victim was taken by surprise, sir?",
      },
      {
        character: "Inspector Blackthorne",
        speech: "Possibly, but notice the burned papers in the fireplace. Someone was destroying evidence.",
      },
      {
        character: "Constable Williams",
        speech: "Should we examine the ashes, Inspector?",
      },
    ],
    background_audio: "Crackling fireplace and wind through windows",
    clues: [
      {
        clue_id: "no_struggle",
        name: "Lack of Struggle Signs",
        description: "Office shows minimal disturbance despite violent death",
      },
      {
        clue_id: "shattered_glass",
        name: "Broken Crystal Glass",
        description: "Single glass shattered near fireplace",
      },
      {
        clue_id: "burned_papers",
        name: "Destroyed Documents",
        description: "Recently burned papers in fireplace suggest evidence destruction",
      },
      {
        clue_id: "no_forced_entry",
        name: "Secure Entry Points",
        description: "No signs of forced entry - killer had access or was admitted",
      },
    ],
    options: [
      {
        option_id: "examine_ashes",
        description: "Examine the ashes in the fireplace",
        next_scene: "scene_5",
      },
      {
        option_id: "investigate_keys",
        description: "Investigate who else had keys to the office",
        next_scene: "scene_6",
      },
      {
        option_id: "look_glass",
        description: "Look for the source of the shattered glass",
        next_scene: "scene_7",
      },
    ],
  },
  {
    scene_id: "scene_5",
    narration:
      "With careful precision, Inspector Blackthorne kneels beside the cold fireplace, using his magnifying glass to examine the charred remains of what were once important documents, the acrid smell of burned paper still lingering in the air like the ghost of secrets destroyed. Among the ashes, he manages to salvage several partially legible fragments that reveal tantalizing glimpses of financial transactions, including what appears to be a large withdrawal dated just three days prior to the murder. The most significant discovery comes in the form of a partially burned letterhead bearing the name 'Whitmore & Associates' - the banking firm of Ashworth's primary business rival, Harold Whitmore, suggesting that the victim had been conducting clandestine negotiations or perhaps uncovering evidence of financial impropriety. As Blackthorne carefully pieces together the fragments, a pattern emerges of what appears to be embezzlement or fraud, with amounts that would have been substantial enough to ruin reputations and destroy careers in Victorian London's tight-knit financial community. The inspector also discovers the remnants of what appears to be a personal letter, with only the words 'my beloved Charlotte' and 'our secret must never' remaining legible, adding another layer of complexity to the web of relationships surrounding the deceased banker. The methodical destruction of these documents suggests that the killer was not only familiar with Ashworth's business dealings but also desperate to prevent certain information from coming to light, indicating a level of premeditation that transforms this from a crime of passion into something far more calculated and sinister.",
    dialogues: [
      {
        character: "Inspector Blackthorne",
        speech: "These ashes tell quite a story. Someone was very thorough in destroying evidence.",
      },
      {
        character: "Constable Williams",
        speech: "What can you make out, sir?",
      },
      {
        character: "Inspector Blackthorne",
        speech: "Financial documents, correspondence with Whitmore & Associates, and... something about Charlotte.",
      },
      {
        character: "Constable Williams",
        speech: "The secretary? This grows more intriguing by the moment.",
      },
    ],
    background_audio: "Rustling papers and distant church bells",
    clues: [
      {
        clue_id: "financial_fraud",
        name: "Evidence of Embezzlement",
        description: "Burned documents suggest financial impropriety involving large sums",
      },
      {
        clue_id: "whitmore_connection",
        name: "Rival Bank Correspondence",
        description: "Letters between Ashworth and his business rival Harold Whitmore",
      },
      {
        clue_id: "charlotte_letter",
        name: "Personal Letter Fragment",
        description: "Burned letter mentioning 'beloved Charlotte' and 'our secret'",
      },
    ],
    options: [
      {
        option_id: "confront_charlotte",
        description: "Confront Charlotte about the personal letter",
        next_scene: "scene_8",
      },
      {
        option_id: "visit_whitmore",
        description: "Visit Harold Whitmore to discuss the business correspondence",
        next_scene: "scene_9",
      },
      {
        option_id: "investigate_withdrawal",
        description: "Investigate the large financial withdrawal",
        next_scene: "scene_10",
      },
    ],
  },
  {
    scene_id: "scene_6",
    narration:
      "Inspector Blackthorne carefully unfolds the unfinished letter, its expensive paper bearing the watermark of London's finest stationers, while the elegant script reveals the tormented thoughts of a man wrestling with his conscience in his final hours. The letter, addressed to 'My Dearest Margaret,' continues beyond the initial line to reveal Ashworth's growing awareness of a conspiracy that threatened to destroy not only his reputation but potentially his life: 'I have discovered that someone close to me has been systematically embezzling funds from our clients' accounts, using forged documents that bear my signature.' The banker's handwriting becomes increasingly erratic as the letter progresses, suggesting either great emotional distress or perhaps the effects of some substance that impaired his motor functions. Most damning is the revelation that follows: 'I confronted this person tonight, and I fear I may have made a grave error in judgment - they know that I know, and I suspect they will stop at nothing to protect themselves.' The letter breaks off abruptly with what appears to be the beginning of a name: 'It was Ch—' before the pen trails off in a long, wavering line across the page. The inspector notes that the ink is still slightly wet, suggesting that Ashworth was writing this confession when he was attacked, and the abrupt ending indicates that his killer struck while he was in the very act of exposing their identity. This letter transforms the investigation from a simple murder case into a complex web of financial crime, betrayal, and desperate self-preservation that reaches into the highest echelons of London's banking establishment.",
    dialogues: [
      {
        character: "Inspector Blackthorne",
        speech: "This letter changes everything. Ashworth knew his killer and was trying to expose them.",
      },
      {
        character: "Constable Williams",
        speech: "The name begins with 'Ch' - that could be Charlotte, the secretary.",
      },
      {
        character: "Inspector Blackthorne",
        speech: "Or it could be Charles, Christopher, or any number of names. We mustn't jump to conclusions.",
      },
      {
        character: "Constable Williams",
        speech: "But the timing, sir - he was writing when attacked. The killer had to stop him from finishing.",
      },
    ],
    background_audio: "Scratching pen and ticking clock",
    clues: [
      {
        clue_id: "embezzlement_confession",
        name: "Ashworth's Confession",
        description: "Letter reveals systematic embezzlement by someone close to him",
      },
      {
        clue_id: "forged_signatures",
        name: "Document Forgery",
        description: "Mention of forged documents bearing Ashworth's signature",
      },
      {
        clue_id: "partial_name",
        name: "Incomplete Name",
        description: "Letter breaks off while writing a name beginning with 'Ch—'",
      },
      {
        clue_id: "wet_ink",
        name: "Fresh Writing",
        description: "Ink still wet, indicating Ashworth was writing when attacked",
      },
    ],
    options: [
      {
        option_id: "examine_records",
        description: "Examine the bank's financial records for forgeries",
        next_scene: "scene_7",
      },
      {
        option_id: "question_associates",
        description: "Question all associates whose names begin with 'Ch'",
        next_scene: "scene_8",
      },
      {
        option_id: "search_documents",
        description: "Search for the original documents that were forged",
        next_scene: "scene_9",
      },
    ],
  },
  {
    scene_id: "scene_7",
    narration:
      "Margaret Ashworth receives Inspector Blackthorne in the drawing room of the family's Belgravia mansion, her composed demeanor and elegant black mourning dress unable to completely mask the calculating intelligence that flickers behind her pale blue eyes. The widow, a woman of perhaps forty years with prematurely silver hair arranged in the latest fashion, maintains the perfect picture of Victorian propriety even as she discusses her husband's violent death with an emotional detachment that strikes the inspector as either remarkable self-control or suspicious indifference. As she pours tea from an exquisite china service, her hands remain perfectly steady, and her voice carries no trace of the grief one might expect from a woman who has just lost her husband of fifteen years to brutal murder. When Blackthorne mentions the unfinished letter, a barely perceptible tightening around her eyes suggests recognition, though she claims no knowledge of any 'terrible mistake' her husband might have made. The drawing room itself tells a story of wealth and refinement, with its silk wallpaper, crystal chandeliers, and collection of valuable paintings, yet the inspector notices that several spaces on the walls show the faint outlines where paintings once hung, suggesting recent financial pressures despite the family's apparent prosperity. Most intriguingly, when asked about her whereabouts the previous evening, Margaret's alibi involves a ladies' charitable meeting that ended at precisely 9:30 - just seventeen minutes before her husband's pocket watch stopped, providing her with either perfect timing for innocence or a carefully constructed cover for murder.",
    dialogues: [
      {
        character: "Margaret Ashworth",
        speech:
          "Inspector, I'm afraid I cannot imagine what terrible mistake Reginald might have been referring to in his letter.",
      },
      {
        character: "Inspector Blackthorne",
        speech:
          "Mrs. Ashworth, your husband seemed quite distressed about something. Had you noticed any changes in his behavior recently?",
      },
      {
        character: "Margaret Ashworth",
        speech:
          "Reginald had been working longer hours lately, but I attributed that to the pressures of business. He rarely discussed such matters with me.",
      },
      {
        character: "Inspector Blackthorne",
        speech: "And your whereabouts last evening?",
      },
      {
        character: "Margaret Ashworth",
        speech:
          "I attended the Ladies' Charitable Society meeting until half past nine, then returned home directly. I have witnesses to verify this.",
      },
    ],
    background_audio: "Elegant piano music and ticking grandfather clock",
    clues: [
      {
        clue_id: "margaret_alibi",
        name: "Margaret's Alibi",
        description: "Claims to be at charity meeting until 9:30, just before estimated time of death",
      },
      {
        clue_id: "missing_paintings",
        name: "Sold Artwork",
        description: "Faint outlines on walls suggest valuable paintings were recently removed",
      },
      {
        clue_id: "emotional_detachment",
        name: "Unusual Composure",
        description: "Margaret shows remarkable lack of grief for a recent widow",
      },
      {
        clue_id: "financial_pressure",
        name: "Hidden Money Problems",
        description: "Despite appearances, family may be facing financial difficulties",
      },
    ],
    options: [
      {
        option_id: "verify_alibi",
        description: "Verify Margaret's alibi with the charitable society",
        next_scene: "scene_10",
      },
      {
        option_id: "investigate_finances",
        description: "Investigate the family's financial situation",
        next_scene: "scene_8",
      },
      {
        option_id: "question_paintings",
        description: "Question Margaret about the missing paintings",
        next_scene: "scene_9",
      },
    ],
  },
  {
    scene_id: "scene_8",
    narration:
      "The confrontation with Charlotte Pemberton takes place in the bank's small conference room, where the young secretary's carefully maintained composure finally begins to crack under the weight of Inspector Blackthorne's persistent questioning and the mounting evidence of her intimate involvement with the deceased banker. Her auburn hair, now completely disheveled, frames a face that alternates between defiant anger and desperate fear as she realizes that her secrets are being systematically exposed by the inspector's methodical investigation. When presented with the fragment of the burned letter mentioning 'beloved Charlotte,' her green eyes fill with tears that she angrily wipes away, her voice trembling as she finally admits to a romantic relationship with Ashworth that had been carefully hidden from London society for over two years. The revelation that she had been embezzling funds to support her ailing mother and younger siblings comes tumbling out in a torrent of confession, her educated accent cracking to reveal the working-class origins she had worked so hard to conceal. She explains how Ashworth had discovered her theft just days before his death, and how she had begged him not to expose her, promising to repay every penny if he would give her time. However, her story takes a darker turn when she reveals that Ashworth had threatened to not only expose her embezzlement but also to end their relationship and dismiss her from her position, leaving her with no means to support her family and facing certain imprisonment. The inspector notes that her account of events places her in Ashworth's office at approximately 9:45 the previous evening, just minutes before the estimated time of death, and her desperate circumstances provide a compelling motive for murder.",
    dialogues: [
      {
        character: "Charlotte Pemberton",
        speech: "Yes, I loved him! And yes, I took the money, but I never meant for anyone to get hurt!",
      },
      {
        character: "Inspector Blackthorne",
        speech: "Miss Pemberton, you were in his office last evening. What exactly transpired between you?",
      },
      {
        character: "Charlotte Pemberton",
        speech:
          "He said he couldn't protect me anymore. That his reputation was more important than... than what we had together.",
      },
      {
        character: "Inspector Blackthorne",
        speech: "And how did you respond to this rejection?",
      },
      {
        character: "Charlotte Pemberton",
        speech:
          "I begged him to reconsider. I told him I would do anything to make it right, but he had already made up his mind.",
      },
      {
        character: "Inspector Blackthorne",
        speech: "The crystal paperweight, Miss Pemberton. Did you strike him with it?",
      },
    ],
    background_audio: "Sobbing and distant street noise",
    clues: [
      {
        clue_id: "charlotte_confession",
        name: "Charlotte's Confession",
        description: "Admits to embezzlement and romantic relationship with Ashworth",
      },
      {
        clue_id: "motive_established",
        name: "Clear Motive",
        description: "Faced exposure, imprisonment, and loss of income for family",
      },
      {
        clue_id: "timeline_match",
        name: "Presence at Scene",
        description: "Charlotte was in office at 9:45, minutes before estimated death",
      },
      {
        clue_id: "desperate_circumstances",
        name: "Family Obligations",
        description: "Supporting sick mother and siblings through embezzled funds",
      },
    ],
    options: [
      {
        option_id: "arrest_charlotte",
        description: "Arrest Charlotte for murder",
        next_scene: "scene_10",
      },
      {
        option_id: "continue_investigating",
        description: "Continue investigating other suspects",
        next_scene: "scene_9",
      },
      {
        option_id: "examine_evidence",
        description: "Examine the evidence more carefully before deciding",
        next_scene: "scene_10",
      },
    ],
  },
  {
    scene_id: "scene_9",
    narration:
      "Harold Whitmore, Ashworth's primary business rival, receives Inspector Blackthorne in his equally opulent but distinctly different office, where the atmosphere crackles with barely concealed hostility and the tension of two alpha males circling each other in the dangerous world of Victorian finance. Whitmore, a man in his fifties with steel-gray hair and the bearing of someone accustomed to wielding considerable power, makes no attempt to hide his satisfaction at his competitor's demise, his cold smile and calculating eyes suggesting a man capable of ruthless action when his interests are threatened. The inspector notes that Whitmore's office contains several maps of London marked with potential bank locations, and correspondence scattered across his desk reveals an aggressive expansion plan that would have been significantly hampered by Ashworth's continued presence in the market. When questioned about the burned correspondence found in Ashworth's fireplace, Whitmore's demeanor shifts from smugness to wariness, and he admits to having met with Ashworth three days prior to discuss what he terms 'a mutually beneficial arrangement' that would have eliminated their competition. However, his version of events takes a sinister turn when he reveals that Ashworth had been investigating irregularities in several joint ventures between their firms, and had threatened to expose what he called 'creative accounting practices' that could have destroyed Whitmore's reputation and business empire. The most damaging revelation comes when Whitmore, in an attempt to deflect suspicion, mentions that he had seen Charlotte Pemberton leaving Ashworth's building at nearly ten o'clock the previous evening, her appearance disheveled and her manner suggesting extreme distress. This testimony not only provides an independent witness to Charlotte's presence at the scene but also establishes a timeline that places her there at the crucial moment when the murder occurred.",
    dialogues: [
      {
        character: "Harold Whitmore",
        speech:
          "Inspector, I won't pretend to mourn Reginald's passing. He was a formidable competitor, but business is business.",
      },
      {
        character: "Inspector Blackthorne",
        speech:
          "Mr. Whitmore, we found correspondence between you and the victim. What was the nature of your recent discussions?",
      },
      {
        character: "Harold Whitmore",
        speech:
          "We were exploring a merger possibility. Ashworth was... concerned about certain financial practices in our joint ventures.",
      },
      {
        character: "Inspector Blackthorne",
        speech: "Concerned enough to threaten exposure?",
      },
      {
        character: "Harold Whitmore",
        speech: "Perhaps. But I had nothing to fear from his investigations. My books are clean, Inspector.",
      },
      {
        character: "Inspector Blackthorne",
        speech: "And your whereabouts yesterday evening?",
      },
      {
        character: "Harold Whitmore",
        speech:
          "At my club until well past midnight. But I did see that secretary of his - Charlotte - leaving his building around ten. She looked quite upset.",
      },
    ],
    background_audio: "Busy office sounds and street traffic",
    clues: [
      {
        clue_id: "whitmore_motive",
        name: "Business Rivalry",
        description: "Whitmore stood to benefit significantly from Ashworth's death",
      },
      {
        clue_id: "financial_investigation",
        name: "Threatened Exposure",
        description: "Ashworth was investigating Whitmore's questionable business practices",
      },
      {
        clue_id: "charlotte_witness",
        name: "Independent Witness",
        description: "Whitmore saw Charlotte leaving the building around 10 PM, appearing distressed",
      },
      {
        clue_id: "club_alibi",
        name: "Whitmore's Alibi",
        description: "Claims to have been at his gentleman's club until after midnight",
      },
    ],
    options: [
      {
        option_id: "verify_whitmore_alibi",
        description: "Verify Whitmore's alibi at his gentleman's club",
        next_scene: "scene_10",
      },
      {
        option_id: "confront_charlotte_whitmore",
        description: "Confront Charlotte with Whitmore's testimony",
        next_scene: "scene_10",
      },
      {
        option_id: "investigate_ventures",
        description: "Investigate the joint venture irregularities",
        next_scene: "scene_10",
      },
    ],
  },
  {
    scene_id: "scene_10",
    narration:
      "In the final scene of this Victorian mystery, Inspector Blackthorne gathers all the suspects in Ashworth's office, where the gaslight casts long shadows across the scene of the crime as he methodically pieces together the complex web of deceit, passion, and desperation that led to the banker's violent death. The evidence, when viewed in its entirety, paints a clear picture of Charlotte Pemberton as the killer, driven to murder by a combination of romantic betrayal, financial desperation, and the imminent threat of exposure and imprisonment. Her presence in the office at the crucial time, confirmed by both her own confession and Harold Whitmore's independent testimony, combined with her clear motive and access to the murder weapon, creates an overwhelming case against the young secretary. However, the inspector's final revelation adds a tragic dimension to the crime when he explains how Charlotte's actions were not those of a cold-blooded killer but rather a desperate woman trapped by circumstances beyond her control, who struck out in a moment of panic when Ashworth threatened to destroy not only her life but the lives of her dependent family members. The crystal paperweight, bearing Ashworth's own initials, becomes a symbol of the irony that the banker was killed by the very symbol of his success, wielded by someone he had trusted and loved but ultimately betrayed. As Charlotte is led away in shackles, her composure finally completely shattered, the inspector reflects on the tragic waste of two lives - one ended by violence, the other destroyed by the consequences of a desperate act born from love, fear, and the crushing weight of Victorian society's unforgiving moral code. The case closes with the understanding that while justice has been served, the true tragedy lies in how the rigid social structures and economic pressures of the era created the conditions that made such a desperate act seem like the only solution to an impossible situation.",
    dialogues: [
      {
        character: "Inspector Blackthorne",
        speech:
          "Ladies and gentlemen, the evidence points clearly to one conclusion. Miss Pemberton, you killed Reginald Ashworth.",
      },
      {
        character: "Charlotte Pemberton",
        speech:
          "I... I didn't mean for it to happen. He was going to destroy everything - my family would have starved!",
      },
      {
        character: "Margaret Ashworth",
        speech: "You were stealing from us, from our clients! How dare you claim victimhood!",
      },
      {
        character: "Harold Whitmore",
        speech: "A sordid affair indeed. The banking industry is better off without such scandal.",
      },
      {
        character: "Inspector Blackthorne",
        speech:
          "Miss Pemberton, you struck him with the paperweight when he threatened to expose you. The timing, the evidence, your own confession - it all points to your guilt.",
      },
      {
        character: "Charlotte Pemberton",
        speech:
          "God forgive me, I never wanted anyone to die. I just wanted him to understand, to give me another chance.",
      },
    ],
    background_audio: "Solemn church bells and rain against windows",
    clues: [
      {
        clue_id: "final_evidence",
        name: "Conclusive Proof",
        description: "All evidence points to Charlotte as the killer",
      },
      {
        clue_id: "tragic_motive",
        name: "Desperate Circumstances",
        description: "Charlotte killed to protect her family from destitution",
      },
      {
        clue_id: "case_closed",
        name: "Justice Served",
        description: "The murder of Reginald Ashworth has been solved",
      },
    ],
    options: [
      {
        option_id: "arrest_close",
        description: "Arrest Charlotte and close the case",
        next_scene: "ending_justice",
      },
      {
        option_id: "reflect_circumstances",
        description: "Reflect on the tragic circumstances",
        next_scene: "ending_tragedy",
      },
      {
        option_id: "consider_implications",
        description: "Consider the broader implications",
        next_scene: "ending_society",
      },
    ],
  },
]

export default function VictorianBankerCase() {
  const router = useRouter()
  const [currentScene, setCurrentScene] = useState("scene_1")
  const [discoveredClues, setDiscoveredClues] = useState<Clue[]>([])
  const [sceneHistory, setSceneHistory] = useState<string[]>(["scene_1"])

  const currentSceneData = mockStoryData.find((scene) => scene.scene_id === currentScene)

  useEffect(() => {
    if (currentSceneData) {
      setDiscoveredClues((prev) => {
        const newClues = currentSceneData.clues.filter(
          (clue) => !prev.some((existingClue) => existingClue.clue_id === clue.clue_id),
        )
        return [...prev, ...newClues]
      })
    }
  }, [currentScene, currentSceneData])

  const handleOptionClick = (next_scene: string) => {
    setCurrentScene(next_scene)
    setSceneHistory((prev) => [...prev, next_scene])
  }

  const handleBackToScene = () => {
    if (sceneHistory.length > 1) {
      const newHistory = sceneHistory.slice(0, -1)
      const previousScene = newHistory[newHistory.length - 1]
      setSceneHistory(newHistory)
      setCurrentScene(previousScene)
    }
  }

  if (!currentSceneData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <p className="text-white">Scene not found</p>
      </div>
    )
  }

  return (
    <div className="case-container">
      <style jsx>{`
        .case-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #6b21a8 0%, #7e22ce 25%, #86198f 50%, #a21caf 75%, #701a75 100%);
          background-image: url('/imgVictorian.png');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          background-repeat: no-repeat;
          position: relative;
          color: white;
          overflow: hidden;
          padding: 20px;
        }
        
        .case-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6));
          z-index: 1;
          pointer-events: none;
        }
        
        .scene-content,
        .evidence-sidebar,
        .back-button,
        .previous-scene-button {
          position: relative;
          z-index: 10;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .scene-content {
          max-width: 750px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 25px;
          margin-right: 320px;
        }
        .narration-box,
        .dialogue-section,
        .clues-section,
        .options-section {
          background: rgba(123, 44, 191, 0.8);
          padding: 25px;
          border-radius: 10px;
          border: 1px solid rgba(147, 51, 234, 0.6);
          box-shadow: 0 0 25px rgba(147, 51, 234, 0.4);
          backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
        }
        
        .narration-box::before,
        .dialogue-section::before,
        .clues-section::before,
        .options-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          animation: shimmer 3s infinite;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(147, 51, 234, 0.4);
        }
        .section-header h3 {
          margin: 0;
          color: white;
          text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
          font-size: 1.2rem;
          letter-spacing: 1px;
        }
        .options-grid {
          display: grid;
          gap: 15px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        .option-btn {
          background: linear-gradient(45deg, #a855f7, #c084fc);
          color: #000;
          border: none;
          padding: 20px 28px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          font-family: serif;
          overflow: hidden;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
        }
        .option-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 30px rgba(168, 85, 247, 0.5);
          background: linear-gradient(45deg, #c084fc, #ddd6fe);
        }
        .btn-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }
        .option-btn:hover .btn-glow {
          left: 100%;
        }
        .back-button {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: transparent;
          border: 2px solid #a855f7;
          color: #a855f7;
          padding: 15px 25px;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: serif;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
        }
        .back-button:hover {
          background: #a855f7;
          color: #6b21a8;
          box-shadow: 0 0 25px rgba(168, 85, 247, 0.6);
          transform: scale(1.05);
        }
        .previous-scene-button {
          position: fixed;
          top: 20px;
          left: 20px;
          background: rgba(168, 85, 247, 0.3);
          color: #a855f7;
          border: 2px solid #a855f7;
          padding: 12px 20px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: serif;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.2);
          z-index: 1001;
        }
        .previous-scene-button:hover {
          background: #a855f7;
          color: #6b21a8;
          transform: translateX(-5px);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
        }
        .evidence-sidebar {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 280px;
          background: rgba(123, 44, 191, 0.95);
          padding: 20px;
          border-radius: 10px;
          border: 2px solid #a855f7;
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
          backdrop-filter: blur(15px);
          z-index: 1000;
        }
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #a855f7;
        }
        .sidebar-header h3 {
          color: white;
          margin: 0;
          font-size: 1.1rem;
        }
        .connection-status {
          background: #a855f7;
          color: #000;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: bold;
          animation: pulse 2s infinite;
        }
        .evidence-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(168, 85, 247, 0.2);
          padding: 10px;
          margin: 8px 0;
          border-radius: 5px;
          font-size: 0.9rem;
          border: 1px solid rgba(168, 85, 247, 0.3);
          transition: all 0.3s ease;
        }
        .evidence-item:hover {
          background: rgba(168, 85, 247, 0.3);
          transform: translateX(5px);
        }
        .evidence-name {
          color: white;
        }
        
        .floating-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(168, 85, 247, 0.6);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        .particle-1 { top: 10%; left: 10%; animation-delay: 0s; }
        .particle-2 { top: 20%; right: 15%; animation-delay: 1s; }
        .particle-3 { bottom: 30%; left: 20%; animation-delay: 2s; }
        .particle-4 { bottom: 10%; right: 10%; animation-delay: 3s; }
        .particle-5 { top: 50%; left: 5%; animation-delay: 4s; }
        .particle-6 { top: 70%; right: 25%; animation-delay: 5s; }
        
        @media (max-width: 1200px) {
          .scene-content {
            max-width: 100%;
            margin-right: 0;
          }
          .evidence-sidebar {
            position: relative;
            right: auto;
            top: auto;
            transform: none;
            width: 100%;
            margin-top: 20px;
          }
        }
        
        @media (max-width: 768px) {
          .options-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="floating-particle particle-1"></div>
      <div className="floating-particle particle-2"></div>
      <div className="floating-particle particle-3"></div>
      <div className="floating-particle particle-4"></div>
      <div className="floating-particle particle-5"></div>
      <div className="floating-particle particle-6"></div>

      {/* Victorian fog effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-800/20 to-violet-700/40 pointer-events-none" />

      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400/15 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute top-20 right-20 w-24 h-24 bg-fuchsia-300/12 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-20 left-1/3 w-40 h-40 bg-violet-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="scene-content">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-2 text-violet-100 drop-shadow-lg">
            The Threadneedle Street Murder
          </h1>
          <p className="text-xl text-violet-200/80 font-serif italic">A Victorian Banking Mystery</p>
        </div>

        {/* Previous Scene Button */}
        {sceneHistory.length > 1 && (
          <button className="previous-scene-button" onClick={handleBackToScene}>
            ← Previous Scene
          </button>
        )}

        {/* Scene Narration */}
        <div className="narration-box">
          <div className="section-header">
            <span className="text-xl">🏛️</span>
            <h3>INVESTIGATION NOTES</h3>
          </div>
          <h2 className="text-3xl font-serif font-semibold mb-4 text-violet-200">
            {currentSceneData.scene_id.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </h2>
          <p className="text-purple-100 leading-relaxed font-serif text-xl">{currentSceneData.narration}</p>
        </div>

        {/* Dialogues */}
        {currentSceneData.dialogues.length > 0 && (
          <div className="dialogue-section">
            <div className="section-header">
              <span className="text-xl">💬</span>
              <h3>CONVERSATIONS</h3>
            </div>
            <div className="space-y-3">
              {currentSceneData.dialogues.map((dialogue, index) => (
                <div key={index} className="bg-purple-800/50 p-3 rounded-lg border-l-4 border-violet-400/50">
                  <p className="text-purple-100 font-serif italic text-lg">
                    <strong>{dialogue.character}:</strong> "{dialogue.speech}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Scene Clues */}
        {currentSceneData.clues.length > 0 && (
          <div className="clues-section">
            <div className="section-header">
              <span className="text-xl">🔍</span>
              <h3>EVIDENCE DISCOVERED</h3>
            </div>
            <div className="grid gap-3">
              {currentSceneData.clues.map((clue) => (
                <div key={clue.clue_id} className="bg-violet-900/20 p-3 rounded-lg border border-violet-500/30">
                  <h4 className="font-serif font-semibold text-violet-200 text-lg">{clue.name}</h4>
                  <p className="text-purple-200 text-base mt-1">{clue.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Options */}
        <div className="options-section">
          <div className="section-header">
            <span className="text-xl">⚖️</span>
            <h3>NEXT ACTION</h3>
          </div>
          <div className="options-grid">
            {currentSceneData.options.map((option) => (
              <button
                key={option.option_id}
                className="option-btn"
                onClick={() => handleOptionClick(option.next_scene)}
              >
                <span className="option-text">{option.description}</span>
                <div className="btn-glow"></div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All Discovered Clues Sidebar */}
      {discoveredClues.length > 0 && (
        <div className="evidence-sidebar">
          <div className="sidebar-header">
            <h3>CASE FILES</h3>
            <div className="connection-status">SECURE</div>
          </div>
          <div className="evidence-list">
            {discoveredClues.map((clue, index) => (
              <div key={index} className="evidence-item">
                <div className="text-lg">📄</div>
                <div className="evidence-name">{clue.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fixed Back Button */}
      <button className="back-button" onClick={() => router.back()}>
        <span>← RETURN TO CASES</span>
      </button>
    </div>
  )
}
